"use client";
import { Stack } from "@mantine/core";
import { useState } from "react";
import Loading from "@/components/_ui/loading/loading";
import PageSkills from "@/components/pages/skills/pageSkills";
import PageCareers from "@/components/pages/careers/pageCareers";
import PageHero from "@/components/pages/hero/pageHero";
import PageContact from "@/components/pages/contact/pageContact";

export default function Home() {
  const [renderCompleted, setRenderCompleted] = useState(false);

  return (
    <>
      <Stack>
        <Loading onComplete={() => setRenderCompleted(true)} />
        <Stack display={"block"} className="main" h={"100vh"} w={"100vw"} style={{
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}>
          {renderCompleted && (
            <>
              <PageHero />
              <PageCareers />
              <PageSkills />
              <PageContact />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
}
