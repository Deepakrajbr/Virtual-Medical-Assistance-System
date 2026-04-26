import { useEffect, useRef } from "react";

export default function VideoCall({ roomName }) {
  const jitsiRef = useRef(null);

  useEffect(() => {
    if (!roomName) return;

    const domain = "meet.jit.si";

    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%", // better for fullscreen
      parentNode: jitsiRef.current,

      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
      },

      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
      },
    };

    // ✅ CREATE API FIRST
    const api = new window.JitsiMeetExternalAPI(domain, options);

    // ✅ THEN ADD EVENTS
    api.addEventListener("participantJoined", () => {
      console.log("Someone joined");
      alert("Patient/Doctor joined the call");
    });

    api.addEventListener("participantLeft", () => {
      console.log("Someone left");
    });

    // cleanup
    return () => api.dispose();
  }, [roomName]);

  return <div ref={jitsiRef} style={{ height: "100%" }} />;
}