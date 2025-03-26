export default function AboutPage() {
  return (
    <div className="about-page py-10">
      <div className="container">
        <h1>About This Project</h1>
        <p>
          This project is a simple Single Page Application built with Next.js, Zustand, and
          TypeScript. It showcases a dynamic list of products fetched from a public API, allowing
          users to like, delete, create, and edit product cards — all stored in client-side state.
        </p>

        <p>
          The goal of this project is to demonstrate core frontend skills: component design,
          routing, state management, and user experience. It&apos;s designed to be clean, minimal,
          and educational — perfect for both learning and showcasing as a portfolio piece.
        </p>
      </div>
    </div>
  );
}
