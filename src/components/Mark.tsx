export default function Mark({ x, y }: { x: number; y: number }) {
  return (
    <>
      <div className="mark" />
      <style jsx>{`
        .mark {
          width: calc(100% / 8);
          height: calc(100% / 8);
          border: 1px solid grey;
          background-color: grey;
          border-radius: 50%;
          align-self: center;
          justify-self: center;
          grid-column: ${x} / span 2;
          grid-row: ${y} / span 2;
        }
      `}</style>
    </>
  );
}
