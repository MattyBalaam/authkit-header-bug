import { authLoader } from "@workos-inc/authkit-remix";

export const loader = authLoader({
  onSuccess: (data) => {
    console.log("WorkOS callback success", data);
  },
});

// If you uncomment this, the root loader will run, but the callback gets stuck in an endless redirect loop
// export default function Index() {
//   return <>callback</>;
// }
