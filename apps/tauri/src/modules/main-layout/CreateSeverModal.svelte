<script lang="ts">
  import { X } from "lucide-svelte";
  import { z } from "zod";
  import { createForm } from "felte";
  import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from "@rgossiaux/svelte-headlessui";
  import { createServerModalOpen } from "../../stores";

  interface FormOptions {
    serverName: string;
  }

  let isOpen: boolean;

  const formSchema = z.object({ serverName: z.string() });

  const { form } = createForm<FormOptions>({
    onSubmit: (values) => {
      formSchema.parse(values);
      console.log("wihhooo");
    },
  });

  createServerModalOpen.subscribe((value) => {
    isOpen = value;
  });

  function close() {
    createServerModalOpen.update(() => false);
  }
</script>

<Dialog open={isOpen} on:close={close} class="grid place-items-center h-screen">
  <DialogOverlay class="fixed inset-0 bg-black opacity-20" />

  <div
    class="prose prose-invert prose-h2:mb-2 
          max-w-64 inline-block relative
           rounded-md bg-slate-800 p-8"
  >
    <DialogTitle>Create your server</DialogTitle>
    <DialogDescription>Create a server to have fun with your friends, sike! you don't have friends...</DialogDescription
    >

    <form use:form class="flex flex-col gap-4">
      <input class="rounded-sm" type="text" name="serverName" aria-describedby="email-validation" />

      <div class="flex justify-between">
        <button class="rounded-md bg-red-900 py-2 px-4 text-red-50">Cancel</button>
        <button type="submit" class="rounded-md bg-green-900 py-2 px-4 text-green-50">Create server</button>
      </div>
    </form>
    <button class="absolute top-2 right-2">
      <X size="24" />
    </button>
  </div>
</Dialog>
