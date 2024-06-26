import { extendTheme } from "@chakra-ui/react";

const theme=extendTheme({
    config: {
        initialColorMode: "Dark",
        useSystemColorMode: false,
    },
});

export default theme;