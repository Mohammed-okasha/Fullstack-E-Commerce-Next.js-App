import Stack from "@mui/material/Stack";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const socialItems = [
  { link: "https://www.linkedin.com/in/mo-sherif9/", icon: <LinkedInIcon /> },
  { link: "https://github.com/Mohammed-okasha", icon: <GitHubIcon /> },
  {
    link: "https://api.whatsapp.com/send/?phone=01151146084&text&app_absent=0",
    icon: <WhatsAppIcon />,
  },
];

const SocialMedia = () => {
  return (
    <Stack direction="row" justifyContent="center" gap={1} pt={2}>
      {socialItems.map((item) => (
        <Link key={item.link} href={item.link}>
          <IconButton
            sx={{
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#fff" },
              "& svg": { fill: "#0063d1" },
            }}
          >
            {item.icon}
          </IconButton>
        </Link>
      ))}
    </Stack>
  );
};

export default SocialMedia;
