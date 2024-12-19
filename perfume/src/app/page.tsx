"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter(); // useRouter 초기화

  // 다음 페이지로 이동하는 핸들러 함수
  const handleNext = () => {
    router.push("/dataVis"); // 이동할 경로로 변경 가능
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* 비디오 백그라운드 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 1 // 투명도 조정
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(240, 240, 240, 0.8)", // 영상 위로 살짝 반투명 배경 추가 가능
          padding: "20px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          {/* 헤더 섹션 */}
          <header style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0" }}>
              데이터 시각화 플랫폼
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>
              데이터를 이해하고 통찰을 얻는 가장 쉬운 방법
            </p>
          </header>

          {/* 소개 섹션 */}
          <section style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>소개</h2>
            <p
              style={{
                fontSize: "1rem",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
                color: "#444",
              }}
            >
              우리 플랫폼은 복잡한 데이터를 직관적이고 아름다운 시각화로 변환하여,
              사용자들이 손쉽게 데이터를 분석하고 인사이트를 도출할 수 있도록 도와줍니다.
              다양한 차트와 그래프를 제공하여 모든 종류의 데이터에 적합한
              시각화 도구를 찾을 수 있습니다.
            </p>
          </section>

          {/* 특징 섹션 */}
          <section style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "30px",
                color: "#333",
              }}
            >
              주요 기능
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {/* 기능 카드 예시 */}
              <div
                style={{
                  backgroundColor: "#fafafa",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    color: "#0070f3",
                  }}
                >
                  실시간 데이터 업데이트
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.5", color: "#555" }}>
                  실시간으로 데이터를 업데이트하여 최신 정보를 기반으로 한 시각화를 제공합니다.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fafafa",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    color: "#0070f3",
                  }}
                >
                  다양한 차트 유형
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.5", color: "#555" }}>
                  바 차트, 라인 차트, 파이 차트 등 다양한 차트 유형을 지원하여
                  모든 데이터에 적합한 시각화를 구현할 수 있습니다.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fafafa",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    color: "#0070f3",
                  }}
                >
                  사용자 친화적 인터페이스
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.5", color: "#555" }}>
                  직관적인 드래그 앤 드롭 인터페이스로 누구나 쉽게 데이터 시각화를 생성할 수 있습니다.
                </p>
              </div>
              {/* 추가 기능 카드를 여기에 추가할 수 있습니다 */}
            </div>
          </section>

          {/* "다음으로" 버튼 섹션 */}
          <section style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={handleNext}
              style={{
                padding: "14px 28px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s ease, transform 0.2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#005bb5";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0070f3";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              다음으로
            </button>
          </section>

          {/* 푸터 섹션 */}
          <footer style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "#999" }}>
              Copyright © Suyoun Lee
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
