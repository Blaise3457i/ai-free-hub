import { AITool, AIPrompt, Tutorial, BlogPost, AIProvider } from '../types';

export const TOOLS: AITool[] = [
  // Image Generators
  { id: 'img-1', name: 'DALL·E Mini', description: 'Generate images from any prompt with this open-source version of DALL-E.', category: 'Image', isFree: true, image: 'https://unavatar.io/craiyon.com', link: 'https://www.craiyon.com/' },
  { id: 'img-2', name: 'Craiyon', description: 'The original DALL-E Mini, accessible and free for everyone to create AI art.', category: 'Image', isFree: true, image: 'https://unavatar.io/craiyon.com', link: 'https://www.craiyon.com/' },
  { id: 'img-3', name: 'Stable Diffusion', description: 'Powerful open-source latent text-to-image diffusion model.', category: 'Image', isFree: true, image: 'https://unavatar.io/stablediffusionweb.com', link: 'https://stablediffusionweb.com/' },
  { id: 'img-4', name: 'DeepAI Image Generator', description: 'Simple and fast AI image generation for creative projects.', category: 'Image', isFree: true, image: 'https://unavatar.io/deepai.org', link: 'https://deepai.org/machine-learning-model/text2img' },
  { id: 'img-5', name: 'Artbreeder', description: 'Collaborative tool for discovering and creating images through genetic mixing.', category: 'Image', isFree: true, image: 'https://unavatar.io/artbreeder.com', link: 'https://www.artbreeder.com/' },
  { id: 'img-6', name: 'NightCafe', description: 'Create amazing AI art using various methods like Neural Style Transfer and VQGAN+CLIP.', category: 'Image', isFree: true, image: 'https://unavatar.io/nightcafe.studio', link: 'https://creator.nightcafe.studio/' },
  { id: 'img-7', name: 'Dream by Wombo', description: 'High-quality AI art generator with unique artistic styles.', category: 'Image', isFree: true, image: 'https://unavatar.io/dream.ai', link: 'https://dream.ai/' },
  { id: 'img-8', name: 'Pixray', description: 'Image generation system with a wide variety of engines and styles.', category: 'Image', isFree: true, image: 'https://unavatar.io/pixray.io', link: 'https://pixray.gob.io/' },
  { id: 'img-9', name: 'Fotor AI Art', description: 'Turn text into art in seconds with this easy-to-use AI generator.', category: 'Image', isFree: true, image: 'https://unavatar.io/fotor.com', link: 'https://www.fotor.com/features/ai-image-generator/' },
  { id: 'img-10', name: 'Runway ML', description: 'Professional creative suite with advanced AI image and video tools.', category: 'Image', isFree: true, image: 'https://unavatar.io/runwayml.com', link: 'https://runwayml.com/' },

  // Video Generators
  { id: 'vid-1', name: 'Pictory AI', description: 'Automatically create short, highly-sharable branded videos from your long-form content.', category: 'Video', isFree: true, image: 'https://unavatar.io/pictory.ai', link: 'https://pictory.ai/' },
  { id: 'vid-2', name: 'Synthesia', description: 'Create professional videos with AI avatars and voiceovers in minutes.', category: 'Video', isFree: true, image: 'https://unavatar.io/synthesia.io', link: 'https://www.synthesia.io/' },
  { id: 'vid-3', name: 'Lumen5', description: 'Video creation platform designed for brands and businesses to produce social content.', category: 'Video', isFree: true, image: 'https://unavatar.io/lumen5.com', link: 'https://lumen5.com/' },
  { id: 'vid-4', name: 'InVideo', description: 'Online video editor with thousands of templates and AI-powered features.', category: 'Video', isFree: true, image: 'https://unavatar.io/invideo.io', link: 'https://invideo.io/' },
  { id: 'vid-5', name: 'FlexClip', description: 'Simple yet powerful video maker and editor for creating professional videos.', category: 'Video', isFree: true, image: 'https://unavatar.io/flexclip.com', link: 'https://www.flexclip.com/' },
  { id: 'vid-6', name: 'Animaker AI', description: 'The future of video making is here with AI-powered animation tools.', category: 'Video', isFree: true, image: 'https://unavatar.io/animaker.com', link: 'https://www.animaker.com/' },
  { id: 'vid-7', name: 'Veed.io AI', description: 'Record and edit videos in your browser with AI-powered subtitles and more.', category: 'Video', isFree: true, image: 'https://unavatar.io/veed.io', link: 'https://www.veed.io/' },
  { id: 'vid-8', name: 'DeepBrain AI', description: 'Create realistic AI avatar videos with text-to-speech technology.', category: 'Video', isFree: true, image: 'https://unavatar.io/deepbrain.io', link: 'https://www.deepbrain.io/' },
  { id: 'vid-9', name: 'Magisto', description: 'Smart video editor that automatically turns your photos and clips into movies.', category: 'Video', isFree: true, image: 'https://unavatar.io/magisto.com', link: 'https://www.magisto.com/' },
  { id: 'vid-10', name: 'Kapwing AI Tools', description: 'Collaborative video editing platform with a suite of AI-powered tools.', category: 'Video', isFree: true, image: 'https://unavatar.io/kapwing.com', link: 'https://www.kapwing.com/' },

  // Text/Code Assistants
  { id: 'txt-1', name: 'ChatGPT Free', description: 'The world-leading conversational AI for text generation and problem-solving.', category: 'Text', isFree: true, image: 'https://unavatar.io/openai.com', link: 'https://chat.openai.com/' },
  { id: 'txt-2', name: 'Claude AI', description: 'Helpful, harmless, and honest AI assistant by Anthropic.', category: 'Text', isFree: true, image: 'https://unavatar.io/anthropic.com', link: 'https://claude.ai/' },
  { id: 'txt-3', name: 'Poe AI', description: 'Access multiple AI models including GPT-4 and Claude in one place.', category: 'Text', isFree: true, image: 'https://unavatar.io/poe.com', link: 'https://poe.com/' },
  { id: 'txt-4', name: 'Perplexity AI', description: 'AI-powered search engine that provides direct answers with citations.', category: 'Text', isFree: true, image: 'https://unavatar.io/perplexity.ai', link: 'https://www.perplexity.ai/' },
  { id: 'txt-5', name: 'YouChat', description: 'AI search assistant that helps you find answers and create content.', category: 'Text', isFree: true, image: 'https://unavatar.io/you.com', link: 'https://you.com/' },
  { id: 'txt-6', name: 'Copy.ai', description: 'AI writing assistant for marketing copy and content creation.', category: 'Text', isFree: true, image: 'https://unavatar.io/copy.ai', link: 'https://www.copy.ai/' },
  { id: 'txt-7', name: 'Jasper AI', description: 'Advanced AI content platform for teams and businesses.', category: 'Text', isFree: true, image: 'https://unavatar.io/jasper.ai', link: 'https://www.jasper.ai/' },
  { id: 'txt-8', name: 'Writesonic', description: 'AI writer for creating SEO-friendly content and marketing materials.', category: 'Text', isFree: true, image: 'https://unavatar.io/writesonic.com', link: 'https://writesonic.com/' },
  { id: 'txt-9', name: 'Grammarly AI', description: 'AI-powered writing assistant that helps you write clearly and effectively.', category: 'Text', isFree: true, image: 'https://unavatar.io/grammarly.com', link: 'https://www.grammarly.com/' },
  { id: 'txt-10', name: 'AI Dungeon', description: 'Infinite AI-generated text adventure game.', category: 'Text', isFree: true, image: 'https://unavatar.io/aidungeon.io', link: 'https://play.aidungeon.io/' },

  // Productivity AI
  { id: 'prod-1', name: 'Notion AI', description: 'AI-powered workspace for notes, docs, and project management.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/notion.so', link: 'https://www.notion.so/product/ai' },
  { id: 'prod-2', name: 'Mem AI', description: 'The world’s first AI-powered self-organizing workspace.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/mem.ai', link: 'https://get.mem.ai/' },
  { id: 'prod-3', name: 'Tactiq AI', description: 'AI-powered meeting transcription and summary tool.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/tactiq.io', link: 'https://tactiq.io/' },
  { id: 'prod-4', name: 'Gamma AI', description: 'Create presentations, websites, and docs in seconds with AI.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/gamma.app', link: 'https://gamma.app/' },
  { id: 'prod-5', name: 'Simplified AI', description: 'All-in-one creative suite with AI writing, design, and video tools.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/simplified.com', link: 'https://simplified.com/' },
  { id: 'prod-6', name: 'Otter.ai', description: 'AI-powered meeting notes and real-time transcription.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/otter.ai', link: 'https://otter.ai/' },
  { id: 'prod-7', name: 'Fireflies AI', description: 'AI meeting assistant that records, transcribes, and searches conversations.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/fireflies.ai', link: 'https://fireflies.ai/' },
  { id: 'prod-8', name: 'Scribe AI', description: 'Automatically create step-by-step guides and documentation with AI.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/scribehow.com', link: 'https://scribehow.com/' },
  { id: 'prod-9', name: 'TextCortex', description: 'Personal AI assistant for all your writing and productivity needs.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/textcortex.com', link: 'https://textcortex.com/' },
  { id: 'prod-10', name: 'ChatSonic', description: 'AI chatbot for content creation, search, and productivity.', category: 'Productivity', isFree: true, image: 'https://unavatar.io/writesonic.com', link: 'https://writesonic.com/chat' },

  // Misc/Utilities
  { id: 'misc-1', name: 'RunDiffusion', description: 'Cloud-based platform for running Stable Diffusion and other AI models.', category: 'Misc', isFree: true, image: 'https://unavatar.io/rundiffusion.com', link: 'https://www.rundiffusion.com/' },
  { id: 'misc-2', name: 'DeepL', description: 'The world’s most accurate AI-powered translator.', category: 'Misc', isFree: true, image: 'https://unavatar.io/deepl.com', link: 'https://www.deepl.com/translator' },
  { id: 'misc-3', name: 'Soundraw', description: 'AI music generator for creators to produce unique, royalty-free music.', category: 'Audio', isFree: true, image: 'https://unavatar.io/soundraw.io', link: 'https://soundraw.io/' },
  { id: 'misc-4', name: 'AIVA', description: 'AI music composer for creating emotional soundtracks.', category: 'Audio', isFree: true, image: 'https://unavatar.io/aiva.ai', link: 'https://www.aiva.ai/' },
  { id: 'misc-5', name: 'Beatoven', description: 'AI-powered royalty-free music generator for video creators.', category: 'Audio', isFree: true, image: 'https://unavatar.io/beatoven.ai', link: 'https://www.beatoven.ai/' },
  { id: 'misc-6', name: 'CopyMonkey', description: 'AI-powered Amazon listing optimization tool.', category: 'Misc', isFree: true, image: 'https://unavatar.io/copymonkey.ai', link: 'https://copymonkey.ai/' },
  { id: 'misc-7', name: 'Unbounce AI', description: 'AI-powered landing page builder and optimization platform.', category: 'Misc', isFree: true, image: 'https://unavatar.io/unbounce.com', link: 'https://unbounce.com/' },
  { id: 'misc-8', name: 'Tome AI', description: 'AI-powered storytelling and presentation platform.', category: 'Misc', isFree: true, image: 'https://unavatar.io/tome.app', link: 'https://tome.app/' },
  { id: 'misc-9', name: 'Inkforall', description: 'AI-powered SEO writing and content marketing platform.', category: 'Misc', isFree: true, image: 'https://unavatar.io/inkforall.com', link: 'https://inkforall.com/' },
  { id: 'misc-10', name: 'Lensa AI', description: 'AI-powered photo editor and avatar generator.', category: 'Misc', isFree: true, image: 'https://unavatar.io/prisma-ai.com', link: 'https://prisma-ai.com/lensa' },
];

export const PROMPTS: AIPrompt[] = [
  // Text Prompts
  { id: 'p-txt-1', text: 'Write a 500-word story about a time-traveling AI.', category: 'Text', badge: 'Storytelling' },
  { id: 'p-txt-2', text: 'Generate a marketing email for a new AI productivity app.', category: 'Text', badge: 'Marketing' },
  { id: 'p-txt-3', text: 'Explain quantum computing in simple terms.', category: 'Text', badge: 'Education' },
  { id: 'p-txt-4', text: 'Summarize a long PDF document into 5 bullet points.', category: 'Text', badge: 'Productivity' },
  { id: 'p-txt-5', text: 'Write 10 social media post ideas for an AI tool launch.', category: 'Text', badge: 'Social Media' },
  { id: 'p-txt-6', text: 'Create a professional bio for a tech entrepreneur.', category: 'Text', badge: 'Professional' },
  { id: 'p-txt-7', text: 'Draft a step-by-step AI automation tutorial.', category: 'Text', badge: 'Tutorial' },
  { id: 'p-txt-8', text: 'Generate 5 catchy blog titles about AI.', category: 'Text', badge: 'Content' },
  { id: 'p-txt-9', text: 'Write a persuasive product description for an AI art tool.', category: 'Text', badge: 'Copywriting' },
  { id: 'p-txt-10', text: 'Create an FAQ for a free AI video generator website.', category: 'Text', badge: 'Support' },

  // Image Prompts
  { id: 'p-img-1', text: 'A futuristic city skyline at sunset, digital art.', category: 'Image', badge: 'Digital Art', outputImage: 'https://picsum.photos/seed/city/800/600' },
  { id: 'p-img-2', text: 'Portrait of a 25-year-old African AI engineer, hyper-realistic.', category: 'Image', badge: 'Portrait', outputImage: 'https://picsum.photos/seed/engineer/800/600' },
  { id: 'p-img-3', text: 'Fantasy forest with neon lights, cinematic style.', category: 'Image', badge: 'Fantasy', outputImage: 'https://picsum.photos/seed/forest/800/600' },
  { id: 'p-img-4', text: 'A robot painting a canvas, photorealistic.', category: 'Image', badge: 'Robotics', outputImage: 'https://picsum.photos/seed/robot-art/800/600' },
  { id: 'p-img-5', text: 'Cartoon-style blue rabbit and green tortoise racing.', category: 'Image', badge: 'Cartoon', outputImage: 'https://picsum.photos/seed/race/800/600' },
  { id: 'p-img-6', text: 'AI-themed abstract art with glowing circuits.', category: 'Image', badge: 'Abstract', outputImage: 'https://picsum.photos/seed/circuits/800/600' },
  { id: 'p-img-7', text: 'Modern workspace with holographic computer screens.', category: 'Image', badge: 'Tech', outputImage: 'https://picsum.photos/seed/hologram/800/600' },
  { id: 'p-img-8', text: 'Cyberpunk street market at night, high detail.', category: 'Image', badge: 'Cyberpunk', outputImage: 'https://picsum.photos/seed/cyberpunk/800/600' },
  { id: 'p-img-9', text: 'Portrait of a woman holding a glowing AI orb.', category: 'Image', badge: 'Mystical', outputImage: 'https://picsum.photos/seed/orb/800/600' },
  { id: 'p-img-10', text: 'Surreal landscape with floating islands and waterfalls.', category: 'Image', badge: 'Surreal', outputImage: 'https://picsum.photos/seed/islands/800/600' },

  // Video Prompts
  { id: 'p-vid-1', text: 'Short tutorial video: How to use free AI image generators.', category: 'Video', badge: 'Tutorial' },
  { id: 'p-vid-2', text: '6-second video of AI robot drawing a picture.', category: 'Video', badge: 'Animation' },
  { id: 'p-vid-3', text: 'Animated explainer for AI text-to-speech tools.', category: 'Video', badge: 'Explainer' },
  { id: 'p-vid-4', text: 'Demo of AI video generator creating a product ad.', category: 'Video', badge: 'Advertising' },
  { id: 'p-vid-5', text: 'Mini storytelling animation: AI animal characters.', category: 'Video', badge: 'Storytelling' },
  { id: 'p-vid-6', text: 'Screen recording style video of AI prompt workflow.', category: 'Video', badge: 'Workflow' },
  { id: 'p-vid-7', text: '10-second cinematic AI art creation video.', category: 'Video', badge: 'Cinematic' },
  { id: 'p-vid-8', text: 'Time-lapse: AI generating music with visualizer.', category: 'Video', badge: 'Music' },
  { id: 'p-vid-9', text: 'Step-by-step AI automation workflow video.', category: 'Video', badge: 'Automation' },
  { id: 'p-vid-10', text: 'Short review animation: Top 5 free AI tools 2026.', category: 'Video', badge: 'Review' },

  // AI Automation / Productivity Prompts
  { id: 'p-auto-1', text: 'Create a workflow to summarize emails using AI.', category: 'Text', badge: 'Automation' },
  { id: 'p-auto-2', text: 'Generate a list of daily productivity tasks for students.', category: 'Text', badge: 'Productivity' },
  { id: 'p-auto-3', text: 'Draft an AI-based marketing automation sequence.', category: 'Text', badge: 'Marketing' },
  { id: 'p-auto-4', text: 'Generate code snippets for automating Excel reports.', category: 'Text', badge: 'Coding' },
  { id: 'p-auto-5', text: 'Suggest AI tools for project management.', category: 'Text', badge: 'Management' },
  { id: 'p-auto-6', text: 'Create a step-by-step prompt for ChatGPT to draft blog posts.', category: 'Text', badge: 'Writing' },
  { id: 'p-auto-7', text: 'Generate a weekly AI learning plan for beginners.', category: 'Text', badge: 'Education' },
  { id: 'p-auto-8', text: 'Write automated response scripts for customer support.', category: 'Text', badge: 'Support' },
  { id: 'p-auto-9', text: 'Draft AI-driven social media posting plan.', category: 'Text', badge: 'Social Media' },
  { id: 'p-auto-10', text: 'Generate prompts for automating image resizing and optimization.', category: 'Text', badge: 'Optimization' },

  // Fun / Creative Prompts
  { id: 'p-fun-1', text: 'Write a sci-fi dialogue between a human and AI robot.', category: 'Text', badge: 'Sci-Fi' },
  { id: 'p-fun-2', text: 'Generate a recipe using only plant-based ingredients.', category: 'Text', badge: 'Cooking' },
  { id: 'p-fun-3', text: 'Create a short poem about AI and creativity.', category: 'Text', badge: 'Poetry' },
  { id: 'p-fun-4', text: 'Generate 5 fantasy character ideas for a game.', category: 'Text', badge: 'Gaming' },
  { id: 'p-fun-5', text: 'Describe a new AI invention that doesn’t exist yet.', category: 'Text', badge: 'Invention' },
  { id: 'p-fun-6', text: 'Generate 5 motivational quotes about technology.', category: 'Text', badge: 'Inspiration' },
  { id: 'p-fun-7', text: 'Create a comic strip script for AI-powered superheroes.', category: 'Text', badge: 'Comics' },
  { id: 'p-fun-8', text: 'Write a story about a green tortoise and a blue rabbit learning AI.', category: 'Text', badge: 'Storytelling' },
  { id: 'p-fun-9', text: 'Generate 10 unique AI-themed usernames for social media.', category: 'Text', badge: 'Social' },
  { id: 'p-fun-10', text: 'Describe a futuristic classroom using AI assistants.', category: 'Text', badge: 'Future' },
];

export const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Mastering Midjourney v6',
    description: 'Learn how to create photorealistic images with the latest Midjourney features.',
    category: 'AI Art',
    thumbnail: 'https://picsum.photos/seed/tut1/800/600',
    steps: ['Choose your subject', 'Apply lighting prompts', 'Upscale for detail'],
  },
  {
    id: '2',
    title: 'Automate Your Workflow with Zapier',
    description: 'Connect your favorite AI tools to automate repetitive tasks.',
    category: 'AI Automation',
    thumbnail: 'https://picsum.photos/seed/tut2/800/600',
    steps: ['Select trigger app', 'Choose AI action', 'Test and deploy'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in 2026',
    description: 'Exploring the next frontier of artificial intelligence and its impact on society.',
    thumbnail: 'https://picsum.photos/seed/blog1/800/600',
    date: 'Feb 20, 2026',
    trending: true,
  },
  {
    id: '2',
    title: 'Top 10 Free AI Tools for Designers',
    description: 'Boost your creative workflow with these incredible free resources.',
    thumbnail: 'https://picsum.photos/seed/blog2/800/600',
    date: 'Feb 18, 2026',
  },
];

export const PROVIDERS: AIProvider[] = [
  {
    id: 'prov-1',
    name: 'Adobe Firefly',
    description: 'Strong image & emerging video generation, commercial-safe creative models.',
    type: 'Premium',
    logo: 'https://unavatar.io/adobe.com',
    link: 'https://www.adobe.com/sensei/generative-ai/firefly.html'
  },
  {
    id: 'prov-2',
    name: 'Runway',
    description: 'Advanced text-to-video and image models (Gen-3/Gen-4 quality). High quality and cinematic outputs.',
    type: 'Premium',
    logo: 'https://unavatar.io/runwayml.com',
    link: 'https://runwayml.com/'
  },
  {
    id: 'prov-3',
    name: 'OpenAI Sora',
    description: 'Cutting-edge story-capable video generation within the OpenAI ecosystem.',
    type: 'Premium',
    logo: 'https://unavatar.io/openai.com',
    link: 'https://openai.com/sora'
  },
  {
    id: 'prov-4',
    name: 'Google Veo',
    description: 'High-detail, cinematic video generation (Imagen Video technology).',
    type: 'Premium',
    logo: 'https://unavatar.io/google.com',
    link: 'https://deepmind.google/technologies/veo/'
  },
  {
    id: 'prov-5',
    name: 'Higgsfield AI',
    description: 'Cinematic video generation with dynamic camera and movement controls.',
    type: 'Premium',
    logo: 'https://unavatar.io/higgsfield.ai',
    link: 'https://higgsfield.ai/'
  },
  {
    id: 'prov-6',
    name: 'Synthesia',
    description: 'AI video with realistic avatars and voice across languages.',
    type: 'Premium',
    logo: 'https://unavatar.io/synthesia.io',
    link: 'https://www.synthesia.io/'
  },
  {
    id: 'prov-7',
    name: 'Midjourney',
    description: 'One of the most widely used premium image generators for photorealistic imagery.',
    type: 'Premium',
    logo: 'https://unavatar.io/midjourney.com',
    link: 'https://www.midjourney.com/'
  },
  {
    id: 'prov-8',
    name: 'Stability AI',
    description: 'Trusted high-quality image models (Stable Diffusion) with a strong ecosystem.',
    type: 'Premium',
    logo: 'https://unavatar.io/stability.ai',
    link: 'https://stability.ai/'
  },
  {
    id: 'prov-9',
    name: 'Pika Labs',
    description: 'Fast, high-quality video output suitable for social and quick cinematic clips.',
    type: 'Premium',
    logo: 'https://unavatar.io/pika.art',
    link: 'https://pika.art/'
  },
  {
    id: 'prov-10',
    name: 'Kling AI',
    description: 'Advanced animated and generative video capabilities with motion realism.',
    type: 'Premium',
    logo: 'https://unavatar.io/klingai.com',
    link: 'https://klingai.com/'
  },
  {
    id: 'prov-11',
    name: 'Hugging Face',
    description: 'The community home for open-source AI models, datasets, and demo apps.',
    type: 'Free/Open',
    logo: 'https://unavatar.io/huggingface.co',
    link: 'https://huggingface.co/'
  },
  {
    id: 'prov-12',
    name: 'Civitai',
    description: 'The largest platform for Stable Diffusion models and creative AI assets.',
    type: 'Free/Open',
    logo: 'https://unavatar.io/civitai.com',
    link: 'https://civitai.com/'
  }
];
