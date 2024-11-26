export default function ConditionalRender({
  when,
  children,
}: {
  children: JSX.Element;
  when: boolean;
}) {
  return when && children;
}
