import { BaseEdge, EdgeProps, getSimpleBezierPath } from "reactflow";

interface CustomEdgeProps extends EdgeProps {}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: CustomEdgeProps) {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge id={id} path={edgePath} />;
}
