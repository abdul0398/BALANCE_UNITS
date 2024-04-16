// src/Treemap.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { projectRelation } from '@/data/projectListingRelation';
interface DataNode {
 name: string;
 value: number;
 children?: DataNode[];
}

interface TreeNode extends d3.HierarchyRectangularNode<DataNode> {
 x0: number;
 y0: number;
 x1: number;
 y1: number;
}

interface TreemapProps {
 data: DataNode;
 width: number;
 height: number;
}

const Treemap: React.FC<TreemapProps> = ({ data, width, height }) => {
 const svgRef = useRef<SVGSVGElement>(null);
 const [tooltip, setTooltip] = useState({ x: 0, y: 0, text: '' });

 useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const root = d3.hierarchy<DataNode>(data)
      .sum(d => d.value);

    const treemap = d3.treemap<DataNode>()
      .size([width, height])
      .padding(1)
      .round(true)
      .tile(d3.treemapBinary);

    treemap(root);

    svg.selectAll<SVGRectElement, TreeNode>('rect')
      .data(root.leaves() as TreeNode[])
      .enter().append('rect')
      .attr('x', d => d.x0 || 0)
      .attr('y', d => d.y0 || 0)
      .attr('width', d => Math.max(20, d.x1 - d.x0))
      .attr('height', d => Math.max(20, d.y1 - d.y0))
      .attr('fill', "#6da8e4")
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#167be1');
        d3.select(this).style('cursor', 'pointer');
        setTooltip(
          { 
            x: event.clientX - 300,
            y: event.clientY - 300,
            text: `Project: ${d.data.name}
            \n, Balance Units: ${projectRelation[d.data.name][projectRelation[d.data.name].length - 1].unitsAvail - projectRelation[d.data.name][projectRelation[d.data.name].length - 1].soldToDate}`
          });
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', '#6da8e4');
        setTooltip({ x: 0, y: 0, text: '' });
      });

    svg.selectAll<SVGTextElement, TreeNode>('text')
      .data(root.leaves() as TreeNode[])
      .enter().append('text')
      .attr('x', d => ((d.x0 || 0) + (d.x1 || 0)) / 2)
      .attr('y', d => ((d.y0 || 0) + (d.y1 || 0)) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.name.length > 10 ? d.data.name.slice(0, 10) + '...' : d.data.name)
      .attr('fill', 'white')
      .style('font-size', '8px');

 }, [data, width, height]);

 return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} style={{ width: '150%', height: '150%' }}>
      </svg>
      {tooltip.text && (
        <div style={{
          position: 'absolute',
          top: tooltip.y,
          left: tooltip.x,
          backgroundColor: 'black',
          border: '1px solid black',
          padding: '5px',
          color: 'white',
          fontSize: '14px',
          zIndex: 1000,
        }}>
          {tooltip.text}
        </div>
      )}
    </div>
 );
};

export default Treemap;
