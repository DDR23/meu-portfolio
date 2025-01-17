import useDevices from "@/hooks/useDevices";
import { userDetails } from "@/types/userDetails";
import { useGSAP } from "@gsap/react";
import { Avatar, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

interface Props {
  user?: userDetails;
}

export default function Hero({ user }: Props) {
  const { isDesktop, isMobile } = useDevices();
  const gsapRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.set(".paper-animated", {
        scale: 10,
        opacity: 0,
      });
      gsap.set(".avatar-animated", {
        scale: 0,
      });
      gsap.set(".objectup-animated", {
        yPercent: 100,
        opacity: 0,
      });
      gsap.set(".line-animated", {
        scaleX: 0,
        opacity: 0,
      });

      gsap
        .timeline()
        .to(".paper-animated", {
          opacity: 1,
          scale: 1,
          duration: .6,
        })
        .to(".avatar-animated", {
          scale: 1,
          duration: .4,
        }, "-=0.2")
        .to(".objectup-animated", {
          opacity: 1,
          yPercent: 0,
          duration: .5,
        }, "-=0.2")
        .to(".line-animated", {
          scaleX: 1,
          opacity: 1,
          duration: .2,
          transformOrigin: "left center",
        }, "-=0.2")
    };
  }, { scope: gsapRef })

  return (
    <>
      <Flex ref={gsapRef} className="panel" id="inicio" h={"100vh"} justify={"center"} align={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
        overflow: "hidden"
      }}>
        <Stack h={"90vh"} gap={0} justify={"center"}>
          <Paper className="paper-animated" bg={"defaultColor"} mx={"auto"} mb={"xl"} radius={"50%"} p={2} shadow="xl">
            <Avatar className="avatar-animated" size={isMobile ? "150" : "250"} src={user?.avatar_url} />
          </Paper>
          <Group>
            <Group component={"span"} style={{ overflow: "hidden" }}>
              <Text className="objectup-animated" component="h1" fw={"normal"} fz={isDesktop ? "xl" : "md"} ta={"end"} inline style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                André Campos
              </Text>
            </Group>
            <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"} />
          </Group>
          <Group component={"span"} style={{ overflow: "hidden" }}>
            <Text className="objectup-animated" component={"h1"} fw={"bold"} fz={isDesktop ? "6rem" : "7.5vw"} ta={"end"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              Desenvolvedor Web
            </Text>
          </Group>
          <Group>
            <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"} />
            <Group component={"span"} style={{ overflow: "hidden" }}>
              <Text className="objectup-animated" component="h1" fw={"normal"} fz={isDesktop ? "xl" : "md"} ta={"end"} inline style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                FULLSTACK | React & Node
              </Text>
            </Group>
          </Group>
        </Stack>
      </Flex>
    </>
  );
}
