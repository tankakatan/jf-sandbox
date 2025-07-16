import { ark } from "@ark-ui/react/factory";
import cx from "classnames";
import Page from "@/pages/users";

export default function App() {
  return (
    <ark.div className={cx("min-h-screen", "bg-gray-50", "p-8")}>
      <ark.div className={cx("max-w-2xl", "mx-auto")}>
        <Page />
      </ark.div>
    </ark.div>
  );
}
