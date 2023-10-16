import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

// Create something a lot-> this is usefull!!
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

Array.from({ length: 10000 }, () => createRandomPost());

//**********************************************/
// Contect API
import { createContext, useContext } from "react";
const PostContext = createContext();

function PostProvider() {
  // Dark mode settings
  const [isFakeDark, setIsFakeDark] = useState(false);
  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );
  return (
    <PostContext.Provider
      value={{
        dark: isFakeDark,
      }}
    >
      <div>
        <button onClick={setIsFakeDark((d) => !d)}></button>
      </div>
    </PostContext.Provider>
  );
}
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) throw new Error("Something went wrong");
  return context;
}

export { usePosts, PostProvider };
