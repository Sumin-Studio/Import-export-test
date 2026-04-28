# Transcription MCP Implementations

## mcp-server-whisper
- **Repo:** https://github.com/arcaputo3/mcp-server-whisper
- MCP server for OpenAI's Whisper API
- Type-safe flat API with Pydantic response models
- Automatic compression for files >25MB
- Per-file error handling

## Commercial Alternatives
- **AssemblyAI** — Universal WebSocket API for real-time voice processing
- **Deepgram** — Speech-to-text integration
- **ElevenLabs** — Audio processing

## Jon's Existing Setup
- `/transcribe` skill available in Claude Code
- Granola integration for meeting transcripts (`/granola` skill)
- Transcription support in creative-mode skills

## Recommended Approach for agentsMCP

### Tools to expose:
1. `transcribe_file` — Transcribe local video/audio file
2. `transcribe_url` — Transcribe from URL (download + transcribe)

### Implementation strategy:
- Use OpenAI Whisper API (already have OPENAI_API_KEY)
- Support formats: mp3, mp4, mpeg, mpga, m4a, wav, webm
- Auto-compress large files before upload
- Return: transcript text, segments with timestamps, language detected

### API:
- `POST https://api.openai.com/v1/audio/transcriptions`
- Model: `whisper-1`
- Max file size: 25MB (compress if larger)

### Auth:
- OpenAI API key (env var: `OPENAI_API_KEY`)

### Future enhancements:
- Real-time transcription via WebSocket
- Speaker diarization (who said what)
- Summary generation alongside transcript
- Integration with meeting tools (Granola, Zoom)
