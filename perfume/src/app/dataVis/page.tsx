"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Node {
  id: string;
  season: string;
  color: string;
  connections: number;
  x?: number;
  y?: number;
  angle?: number;
}

interface Link {
  source: string;
  target: string;
  weight: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export default function RadialNetworkGraphBySeason() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [connectionThreshold, setConnectionThreshold] = useState<number>(5);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const selectedNotes: Record<string, string> = {
    bergamot: "Summer",
    aldehydes: "Winter",
    neroli: "Spring",
    "mandarin orange": "Summer",
    lemon: "Summer",
    grapefruit: "Summer",
    orange: "Autumn",
    peach: "Autumn",
    citruses: "Summer",
    "pink pepper": "Winter",
    jasmine: "Summer",
    rose: "Spring",
    "ylang-ylang": "Summer",
    iris: "Spring",
    violet: "Spring",
    "orange blossom": "Spring",
    "orris root": "Autumn",
    tuberose: "Summer",
    "may rose": "Spring",
    geranium: "Summer",
    vetiver: "Autumn",
    vanilla: "Winter",
    sandalwood: "Winter",
    musk: "Winter",
    patchouli: "Autumn",
    amber: "Autumn",
    "white musk": "Winter",
    "tonka bean": "Winter",
    cedar: "Autumn",
    oakmoss: "Autumn",
  };

  const seasonColors: Record<string, string> = {
    Spring: "#98FB98",
    Summer: "#FFD700",
    Autumn: "#D2691E",
    Winter: "#87CEEB",
  };

  useEffect(() => {
    const processData = async () => {
      const rawData = await d3.csv("/top_7_filtered_perfumes.csv");

      const nodesMap: Record<string, Node> = {};
      const links: Link[] = [];

      rawData.forEach((row: any) => {
        const allNotes: string[] = [];
        ["Top", "Middle", "Base"].forEach((column) => {
          if (row[column]) {
            const notes = row[column].split(",").map((n: string) => n.trim().toLowerCase());
            allNotes.push(...notes);
          }
        });

        const uniqueNotes = Array.from(new Set(allNotes.filter((note) => selectedNotes[note])));

        uniqueNotes.forEach((note) => {
          if (!nodesMap[note]) {
            nodesMap[note] = {
              id: note,
              season: selectedNotes[note],
              color: seasonColors[selectedNotes[note]],
              connections: 0,
            };
          }
        });

        for (let i = 0; i < uniqueNotes.length; i++) {
          for (let j = i + 1; j < uniqueNotes.length; j++) {
            const source = uniqueNotes[i];
            const target = uniqueNotes[j];
            const existingLink = links.find(
              (link) =>
                (link.source === source && link.target === target) ||
                (link.source === target && link.target === source)
            );
            if (existingLink) {
              existingLink.weight++;
            } else {
              links.push({ source, target, weight: 1 });
            }
            nodesMap[source].connections++;
            nodesMap[target].connections++;
          }
        }
      });

      const filteredLinks = links.filter((link) => link.weight > connectionThreshold);
      const filteredNodes = Object.values(nodesMap).filter((node) =>
        filteredLinks.some((link) => link.source === node.id || link.target === node.id)
      );

      setData({ nodes: filteredNodes, links: filteredLinks });
    };

    processData();
  }, [connectionThreshold]);

  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0 || data.links.length === 0) return;

    const width = 800;
    const height = 800;
    const radius = 300;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("font", "12px sans-serif");

    svg.selectAll("*").remove();

    const seasonOrder: Record<string, number> = { Spring: 0, Summer: 1, Autumn: 2, Winter: 3 };
    const sortedNodes = [...data.nodes].sort(
      (a, b) =>
        seasonOrder[a.season as keyof typeof seasonOrder] -
        seasonOrder[b.season as keyof typeof seasonOrder]
    );

    const angleStep = (2 * Math.PI) / sortedNodes.length;
    const labelOffset = 30;

    sortedNodes.forEach((node, i) => {
      const angle = i * angleStep;
      node.x = width / 2 + radius * Math.cos(angle);
      node.y = height / 2 + radius * Math.sin(angle);
      node.angle = angle;
    });

    const maxWeight = d3.max(data.links, (link) => link.weight) || 1;

    svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", (d) =>
        selectedNode &&
        (d.source === selectedNode || d.target === selectedNode)
          ? "#ff5722"
          : "#999"
      )
      .attr("stroke-opacity", (d) =>
        selectedNode &&
        !(d.source === selectedNode || d.target === selectedNode)
          ? 0.1
          : 0.6
      )
      .attr("stroke-width", (d) => (d.weight / maxWeight) * 5)
      .attr("x1", (d) => sortedNodes.find((n) => n.id === d.source)?.x || 0)
      .attr("y1", (d) => sortedNodes.find((n) => n.id === d.source)?.y || 0)
      .attr("x2", (d) => sortedNodes.find((n) => n.id === d.target)?.x || 0)
      .attr("y2", (d) => sortedNodes.find((n) => n.id === d.target)?.y || 0);

    svg
      .append("g")
      .selectAll("circle")
      .data(sortedNodes)
      .join("circle")
      .attr("r", (d) => (d.id === highlightedNode ? 10 : 6))
      .attr("cx", (d) => d.x || 0)
      .attr("cy", (d) => d.y || 0)
      .attr("fill", (d) => (d.id === highlightedNode ? "#ff5722" : d.color))
      .on("mouseover", (event, d) => setHighlightedNode(d.id))
      .on("mouseout", () => setHighlightedNode(null))
      .on("click", (event, d) => setSelectedNode(d.id === selectedNode ? null : d.id));

    svg
      .append("g")
      .selectAll("text")
      .data(sortedNodes)
      .join("text")
      .attr("x", (d) => (d.x || 0) + labelOffset * Math.cos(d.angle || 0))
      .attr("y", (d) => (d.y || 0) + labelOffset * Math.sin(d.angle || 0))
      .attr("text-anchor", (d) => ((d.angle || 0) > Math.PI ? "end" : "start"))
      .attr("alignment-baseline", "middle")
      .attr(
        "transform",
        (d) =>
          `rotate(${((d.angle || 0) * 180) / Math.PI}, ${(d.x || 0) + labelOffset * Math.cos(d.angle || 0)}, ${(d.y || 0) + labelOffset * Math.sin(d.angle || 0)})`
      )
      .style("font-size", "10px")
      .text((d) => d.id);
  }, [data, highlightedNode, selectedNode]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Radial Network Graph with Hover and Click Effects</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Connections {'>'}{" "}
          <input
            type="number"
            value={connectionThreshold}
            onChange={(e) => setConnectionThreshold(Number(e.target.value))}
            style={{ width: "50px" }}
          />
        </label>
      </div>
      <svg ref={svgRef} width={800} height={800}></svg>
    </div>
  );
}

