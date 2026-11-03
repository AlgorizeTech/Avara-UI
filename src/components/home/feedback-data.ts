/* ═══════════════════════════════════════════════
   FEEDBACK WALL DATA
   Only `id`, `name` and `message` are required. Everything else is optional and
   the card collapses cleanly without it: no `url` means the card isn't a link,
   no `profile` means the name isn't a link, no `avatar` falls back to initials,
   no `rating` / `media` simply leaves those rows out.
   ═══════════════════════════════════════════════ */

export interface FeedbackMedia {
	type: "image" | "video";
	/** Image source, or video file source. */
	src: string;
	/** Video poster frame (also used as the image preview for a video). */
	poster?: string;
	alt?: string;
	/** Intrinsic size, so the card reserves space and doesn't shift on load. */
	width?: number;
	height?: number;
}

export interface FeedbackItem {
	id: string;
	name: string;
	message: string;
	/** Link to the original post / review. */
	url?: string;
	/** Link to the author's profile. */
	profile?: string;
	avatar?: string;
	/** 0–5, fractions allowed. */
	rating?: number;
	media?: FeedbackMedia;
}

const CLOUDINARY = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto";

export const FEEDBACK: FeedbackItem[] = [
	{
		id: "jeremie-montero",
		name: "Jeremie Montero",
		message:
			"I went through some of the react components in the library and the motion interactions are amazing!",
		url: "https://lnkd.in/p/g2NycQi7",
		profile: "https://www.linkedin.com/in/halfbakedtruths/",
		avatar: `${CLOUDINARY}/v1793693733/jermie-1793693785056.jpg`,
	},
	{
		id: "pratyush",
		name: "Pratyush",
		message:
			"Created this Wallet card component using https://avaraui.com made by @Pranto39. Love the detailing done by the Opus all those stitching around the edges. And the detailed badge.",
		url: "https://x.com/Pratyusshmd/status/2116134727333958066",
		media: {
			type: "video",
			src: "https://res.cloudinary.com/dodndg7ai/video/upload/v1793704596/ic-ay7eptvhd-ace-1793704646032.mp4",
			/* Cloudinary renders the first frame when the same asset is asked for as an image. */
			poster: "https://res.cloudinary.com/dodndg7ai/video/upload/f_webp,q_auto,so_0/v1793704596/ic-ay7eptvhd-ace-1793704646032.jpg",
			alt: "Wallet card component built with Avara UI",
			width: 640,
			height: 360,
		},
		profile: "https://x.com/Pratyusshmd",
		avatar: `${CLOUDINARY}/v1793701811/pratyush-1793701862411.jpg`,
	},
	{
		id: "vanillacache",
		name: "VanillaCache",
		message: `if you're looking to overengineer something equally unnecessary, here's what i used:

> next.js + react,  app
> three.js / r3f, 3D command centre
> avara ui + tailwind v4,  ui
> helixdb, dependency graph
> hugging face + onnx, local embeddings
> chokidar + websockets,  live updates
> grok hooks + acp/mcp, agent control`,
		url: "https://x.com/VanillaCache/status/2115751630540837130",
		profile: "https://x.com/VanillaCache",
		avatar: `${CLOUDINARY}/v1793701811/vanillacache-1793701862413.jpg`,
	},
	{
		id: "rubens-soto",
		name: "Rubens Soto",
		message: "I migrated my new project entirely to avara ui haha",
		url: "https://x.com/rubenssoto_ai/status/2116484317463355468",
		profile: "https://x.com/rubenssoto_ai",
		avatar: `${CLOUDINARY}/v1793701811/rubenssoto_ai-1793701862412.jpg`,
	},
	{
		id: "tirtha-sarker",
		name: "Tirtha Sarker",
		message: "This looks amazing ! Love the large variety of choices you have here.",
		url: "https://x.com/tirthaexe/status/2115462972550353152",
		profile: "https://x.com/tirthaexe",
		avatar: `${CLOUDINARY}/v1793701736/tirthaexe-1793701787286.jpg`,
	},
	{
		id: "sahil-panhotra",
		name: "Sahil Panhotra",
		message: "really nice UI",
		url: "https://x.com/SahilPanhotra/status/2115466406439559284",
		profile: "https://x.com/SahilPanhotra",
		avatar: `${CLOUDINARY}/v1793701811/sahilpanhotra-1793701862412.jpg`,
	},
	{
		id: "em",
		name: "Em",
		message: "thanks a lot for this! Bookmarked for later to use it",
		url: "https://x.com/creativemh/status/2115564244808917380",
		profile: "https://x.com/creativemh",
		avatar: `${CLOUDINARY}/v1793701810/creativemh-1793701862410.jpg`,
	},
	{
		id: "luqman",
		name: "Luqman",
		message: "Looks really great. Bookmark done :)",
		url: "https://x.com/0xluqman/status/2115724801713299641",
		profile: "https://x.com/0xluqman",
		avatar: `${CLOUDINARY}/v1793701811/luqman-1793701862411.jpg`,
	},
	{
		id: "ivan-khokhlov",
		name: "Ivan Khokhlov",
		message:
			"Very beautiful library Pranto! I will share a link to it within my company as well.",
		url: "https://x.com/ivantinkers/status/2115562602134921443",
		profile: "https://x.com/ivantinkers",
		avatar: `${CLOUDINARY}/v1793701811/ivantinkers-1793701862411.png`,
	},
];
