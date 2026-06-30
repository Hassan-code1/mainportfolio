export const trackView = async () => {
  const workspace = import.meta.env.VITE_COUNTERAPI_WORKSPACE;
  const namespace = import.meta.env.VITE_COUNTERAPI_NAMESPACE;

  if (!workspace || !namespace) {
    console.error("Counter API workspace or namespace is not defined in env variables.");
    return null;
  }

  try {
    const isVisited = localStorage.getItem("portfolio-visited");
    
    if (isVisited) {
      // If already visited, just get the current count
      const res = await fetch(`https://api.counterapi.dev/v1/${workspace}/${namespace}`);
      const data = await res.json();
      return data.count;
    } else {
      // If first visit, increment the count
      const res = await fetch(`https://api.counterapi.dev/v1/${workspace}/${namespace}/up`);
      const data = await res.json();
      localStorage.setItem("portfolio-visited", "true");
      return data.count;
    }
  } catch (error) {
    console.error("Failed to fetch views from Counter API", error);
    return null;
  }
};
