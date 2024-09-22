function LoadingNotes() {
  return (
    <div className="mx-auto max-w-screen-md">
      <ul className="mt-5 space-y-2">
        {[...Array(5)].map(() => (
          <li className="w-full h-12 bg-stone-50 rounded-lg"></li>
        ))}
      </ul>
    </div>
  );
}

export default LoadingNotes;
