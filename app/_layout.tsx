import Stack from "@/components/ui/Stack";
import ThemeProvider from "@/components/ui/ThemeProvider";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          title: "🥓 Bacon",
        }}
      />
    </ThemeProvider>
  );
}
