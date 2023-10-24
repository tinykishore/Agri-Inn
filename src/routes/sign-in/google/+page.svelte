<script lang="ts">
    import {enhance} from "$app/forms";

    export let data;
</script>


<main class="mt-32">
	Account Created Successfully <br>
	Welcome to Agri-Inn {data.full_name} <br>
	{data.email}<br>
	<img alt={data.full_name} class="rounded-full" height="100px" src={data.profile_picture} width="1"/> <br>
	{data._id} <br>

	<form method="POST" use:enhance>
		<input class="border-2 border-gray-300 rounded-lg p-2 m-2"
			   name="username"
			   placeholder="Choose Username"
			   type="text">

		<input class="border-2 border-gray-300 rounded-lg p-2 m-2"
			   name="password"
			   placeholder="Choose Password"
			   type="password">

		<button class="bg-blue-500 text-white rounded-lg p-2 m-2"
				type="submit">
			Login
		</button>

	</form>

</main>