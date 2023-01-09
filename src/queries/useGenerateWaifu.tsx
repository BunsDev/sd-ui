import { useMutation } from "@tanstack/react-query";
import { GenerateWaifuValues } from "../types";
import TriggerNotification from "../utils/TriggerNotification";

async function generateWaifu({
  prevBlob,
  values,
  random,
}: GenerateWaifuValues) {
  try {
    const body = random
      ? JSON.stringify({})
      : JSON.stringify({
          prompt: values?.positive || "",
          negative_prompt: values?.negative || "",
        });
    const res = await fetch(
      `https://waifus-api.nemusona.com/api/generate?token=${process.env.TOKEN}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: body,
      }
    );
    if (res.status === 200) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (prevBlob) {
        URL.revokeObjectURL(prevBlob);
      }
      return url;
    } else if (res.status === 429) {
      TriggerNotification({
        message: "Rate limit reached. Try again later.",
        color: "red",
        loading: false,
      });
      return prevBlob;
    }
  } catch (error: any) {
    TriggerNotification({
      message: error.toString(),
      color: "red",
      loading: false,
    });
    return prevBlob;
  }
}

export default function useGenerateWaifu() {
  return useMutation(
    ({ prevBlob, values, random }: GenerateWaifuValues) =>
      generateWaifu({ prevBlob, values, random }),
    {
      onSuccess: () => {
        TriggerNotification({
          message: "Waifu generated",
          color: "green",
          loading: false,
        });
      },
      onError: (error: any) => {
        TriggerNotification({
          message: error.toString(),
          color: "red",
          loading: false,
        });
      },
      onMutate: () => {
        TriggerNotification({
          message: "Creating Waifu",
          color: "yellow",
          loading: false,
        });
      },
    }
  );
}
