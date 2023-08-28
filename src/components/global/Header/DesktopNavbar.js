import Box from "@mui/material/Box";
import Link from "next/link";
import { mainPaths } from "@/assets/data/paths";

const DesktopNavbar = () => {
  return (
    <Box>
      {mainPaths.map((item) => {
        return (
          <Link
            key={item.title}
            href={item.path}
            className="nav_link"
            style={{
              padding: "6px 12px",
            }}
          >
            {item.title}
          </Link>
        );
      })}
    </Box>
  );
};

export default DesktopNavbar;
