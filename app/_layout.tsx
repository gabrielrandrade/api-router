import ThemeProvider from "@/components/ui/ThemeProvider";

import Tabs from "@/components/ui/Tabs";

export default function Layout() {
  return (
    <ThemeProvider>
      <Tabs>
        <Tabs.Screen
          name="(index)"
          systemImage="house"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="(info)"
          systemImage="brain.fill"
          options={{
            title: "Info",
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
