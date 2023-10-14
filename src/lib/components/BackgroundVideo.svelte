<script lang="ts">
    import bg_video from "$lib/assets/videos/landing-page-background-video.mp4";

</script>

<div class="absolute top-0 left-0 w-full h-screen -z-10 select-none no-scroll">
    <video class="brightness-75 absolute object-cover top-0  min-w-full min-h-screen -z-[1000] select-none" autoplay muted loop playsinline>
          <source type="video/mp4" src={bg_video}/>
    </video>
</div>