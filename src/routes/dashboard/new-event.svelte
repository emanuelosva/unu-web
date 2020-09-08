<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    if (!token) return this.redirect(302, "login");
    return { token };
  }
</script>

<script>
  // Props
  export let token;

  // Components
  import Title from "../../components/Title.svelte";
  import PrincipalButton from "../../components/PrincipalButton.svelte";

  import { goto } from "@sapper/app";
  import { goToLogin, apiRequest, imageReader } from "../../utils";
  import { user } from "../../store";

  // Reactive contants
  let name = "";
  let template = "";
  let url = "";
  let startDate = "";
  let utc = "";
  let organizationUrl = "";

  const createEvent = async () => {
    const body = { name, template, url, startDate, utc, organizationUrl };

    const { data, status } = await apiRequest({
      path: "/events",
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (status === 201) {
      await goto("");
    }
  };
</script>

<style>
</style>

<div class="NewEvent">
  <h1>New Event</h1>
</div>
