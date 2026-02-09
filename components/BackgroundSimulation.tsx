
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BackgroundSimulation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.selectAll("*").remove();

    const nodes = Array.from({ length: 40 }, (_, i) => ({ id: i }));
    const links: any[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.95) {
          links.push({ source: i, target: j });
        }
      }
    }

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 3)
      .attr("fill", "#60a5fa")
      .attr("opacity", 0.5);

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("cx", d => (d as any).x)
        .attr("cy", d => (d as any).y);
    });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.attr("width", w).attr("height", h);
      simulation.force("center", d3.forceCenter(w / 2, h / 2)).alpha(0.3).restart();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      simulation.stop();
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default BackgroundSimulation;
