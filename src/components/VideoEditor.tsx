import { Player } from "@remotion/player";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Plus,
  Trash2
} from "lucide-react";

const VideoEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [tracks, setTracks] = useState([
    { id: 1, name: "Video Track 1", clips: [] },
    { id: 2, name: "Audio Track 1", clips: [] },
  ]);

  const durationInFrames = 900; // 30 seconds at 30fps
  const fps = 30;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (frame: number) => {
    setCurrentTime(frame / fps);
  };

  const addTrack = () => {
    const newTrack = {
      id: tracks.length + 1,
      name: `Track ${tracks.length + 1}`,
      clips: [],
    };
    setTracks([...tracks, newTrack]);
  };

  const removeTrack = (trackId: number) => {
    setTracks(tracks.filter((track) => track.id !== trackId));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Video Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline">Import Media</Button>
          <Button>Export</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Preview Area */}
        <div className="w-2/3 p-4 border-r">
          <Card className="w-full aspect-video overflow-hidden bg-black">
            <Player
              component={() => <div className="bg-black w-full h-full" />}
              durationInFrames={durationInFrames}
              fps={fps}
              compositionWidth={1920}
              compositionHeight={1080}
              style={{
                width: "100%",
                height: "100%",
              }}
              autoPlay={isPlaying}
              loop
              onFrame={handleTimeUpdate}
            />
          </Card>
          
          {/* Controls */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(0)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(durationInFrames / fps)}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <Slider
              value={[currentTime]}
              min={0}
              max={durationInFrames / fps}
              step={1 / fps}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="w-1/3 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Timeline</h2>
            <Button variant="outline" size="sm" onClick={addTrack}>
              <Plus className="h-4 w-4 mr-2" />
              Add Track
            </Button>
          </div>
          
          <ScrollArea className="flex-1 border rounded-md p-2">
            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-2 p-2 bg-muted rounded-md group"
                >
                  <div className="flex-1">{track.name}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeTrack(track.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;