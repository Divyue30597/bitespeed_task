import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

type CustomEdgeProps = EdgeProps;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: CustomEdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ strokeWidth: 2 }}
      markerEnd={markerEnd}
    />
  );
}
