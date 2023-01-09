import {
  Box,
  Button,
  Center,
  Text,
  Group,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ThemeProvider } from "./ThemeProvider";
import { Image } from "@mantine/core";
import Nemu from "./static/nemu.png";
import Cute from "./static/cute.gif";
import { FormValues } from "./types";
import useGenerateWaifu from "./queries/useGenerateWaifu";
import useGetStatus from "./queries/useGetStatus";

export default function App() {
  const {
    mutate: generate,
    data: waifuData,
    isLoading: generating,
  } = useGenerateWaifu();

  useGetStatus();

  const form = useForm({
    initialValues: {
      positive: "",
      negative: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    generate({ prevBlob: waifuData, values: values, random: false });
  };

  const onRandom = () => {
    generate({ prevBlob: waifuData, values: null, random: true });
  };

  return (
    <ThemeProvider>
      <Box sx={{ maxWidth: 600 }} mx="auto" my="lg">
        <Center pb={5}>
          <Image src={Cute} width={64} height={64} />
          <Text fz="xl" fw={700}>
            Nemu's Waifu Generator
          </Text>
        </Center>
        <Center sx={{ maxWidth: 600, maxHeight: 600 }} pb={5}>
          <div style={{ width: 512, height: 512, position: "relative" }}>
            <LoadingOverlay visible={generating} overlayBlur={2} />
            <Image
              radius="md"
              height={512}
              width={512}
              withPlaceholder={!waifuData}
              src={waifuData}
              placeholder={<Text fz="xl" fw={500}>Image</Text>}
            />
          </div>
        </Center>

        <form
          onSubmit={form.onSubmit((values: FormValues) => onSubmit(values))}
        >
          <TextInput
            label=" Positive Prompts"
            placeholder="kawaii, llamas, you"
            {...form.getInputProps("positive")}
            disabled={generating}
            pb={3}
          />
          <TextInput
            label="Negative Prompts"
            placeholder="sbf, caroline, alameda"
            {...form.getInputProps("negative")}
            disabled={generating}
          />
          <Group position="right" mt="md">
            <Button
              radius="md"
              size="md"
              onClick={onRandom}
              disabled={generating}
            >
              Surprise Me
            </Button>
            <Button radius="md" size="md" type="submit" disabled={generating}>
              Generate
            </Button>
          </Group>
        </form>
      </Box>
    </ThemeProvider>
  );
}
