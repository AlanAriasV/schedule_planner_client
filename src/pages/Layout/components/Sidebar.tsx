import { useState, useEffect } from "react";
import { CustomButton, CustomNavLink } from "src/components";
import { sideBarOptions } from "src/utils/const";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(
    localStorage.getItem("expanded") === "true" || false
  );

  // const sideBarClass = `sidebar${expanded ? ' expanded' : ''}`;

  useEffect(() => {
    localStorage.setItem("expanded", expanded.toString());
  }, [expanded]);

  return (
    <aside
      className={"sidebar"}
      style={{ maxWidth: expanded ? "200px" : "60px" }}
    >
      <CustomButton
        onClick={() => {
          setExpanded(!expanded);
        }}
        icon={<AiOutlineMenu className="icon" />}
        name="Menu"
      />
      {sideBarOptions.map((option) => {
        return <CustomNavLink key={option.path} {...option} />;
      })}
      <CustomButton
        onClick={() => {}}
        icon={<AiOutlineLogout className="icon" />}
        name="Logout"
      />
    </aside>
  );
}
