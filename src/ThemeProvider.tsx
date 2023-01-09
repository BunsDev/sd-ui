import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>{children}</NotificationsProvider>
    </MantineProvider>
  );
}
