import { Prompt, Dare, FoodOutlet } from './types';

export const PROMPTS: Prompt[] = [
  {
    id: 'p1',
    title: 'The Ghost in the Machine',
    theme: 'Digital Afterlife',
    body: `We leave traces everywhere. Fragments of conversations, abandoned accounts, corrupted files, and metadata that outlives its utility.
    Explore the concept of digital residue. What happens to the things we forget to delete?
    Is there beauty in the glitch, or only clutter?
    Build something that excavates, preserves, or ritually destroys these digital ghosts.
    Think about memory, decay, and the permanence of the temporary.`
  },
  {
    id: 'p2',
    title: 'Silence as a Service',
    theme: 'Noise Pollution',
    body: `The modern web is a scream. Notifications, autoplay videos, infinite scrolls, and the constant demand for attention.
    Create a digital space that offers the opposite.
    How do you design for absence? How does an interface respect the user's need for solitude?
    We are not looking for a productivity tool. We are looking for a sanctuary.
    Explore the utility of nothingness.`
  },
  {
    id: 'p3',
    title: 'The Third Place (Virtual)',
    theme: 'Community',
    body: `Oldenburg defined the "third place" as a social surrounding separate from home and work.
    Cafés, parks, libraries—places where conversation is the primary activity and status is leveled.
    The internet used to feel like this. Now it feels like a billboard.
    Reclaim the casual, unplanned encounter.
    Build a space that feels like a room, not a feed. Warmth over engagement metrics.`
  },
  {
    id: 'p4',
    title: 'Analog Futures',
    theme: 'Tactile Web',
    body: `We touch glass all day, but we feel nothing.
    What if the web had texture, weight, and resistance?
    Explore the intersection of high-tech connectivity and low-tech sensibility.
    Think of dials, switches, paper, rust, and grain.
    How can a screen evoke the feeling of using a tool that has been handed down for generations?
    Make the pixels feel heavy.`
  },
  {
    id: 'p5',
    title: 'Lost in Translation',
    theme: 'Language & Meaning',
    body: `Language is an imperfect vessel for thought.
    We lose nuance in text, tone in voice, and context in translation.
    Focus on the gap between what is meant and what is understood.
    Create an experience that highlights ambiguity, misinterpretation, or the beauty of the indescribable.
    It doesn't have to solve communication. It just has to make us feel the weight of it.`
  }
];

export const DARES: Dare[] = [
  { id: 'd1', text: 'No text inputs allowed. Users can only interact via sliders, toggles, or sound.', intensity: 'High' },
  { id: 'd2', text: 'The interface must degrade or age the longer it is used.', intensity: 'Medium' },
  { id: 'd3', text: 'Your application must be purely monochrome. No greyscale, just #000000 and #FFFFFF.', intensity: 'Medium' },
  { id: 'd4', text: 'Build for a screen size of 320px width only. Ignore desktop completely.', intensity: 'Low' },
  { id: 'd5', text: 'The user must collaborate with a stranger, but they cannot speak to them.', intensity: 'High' },
  { id: 'd6', text: 'Every action must have a deliberate 2-second delay.', intensity: 'Medium' },
  { id: 'd7', text: 'Use no existing UI libraries. Every button must be drawn from scratch (SVG/Canvas).', intensity: 'High' },
  { id: 'd8', text: 'The app works only between 2 AM and 5 AM local time.', intensity: 'Medium' },
];

export const RULES_PHILOSOPHY = [
  {
    title: "Invitation, Not Instruction",
    content: "We provide the spark. You provide the fuel. If a prompt feels vague, that is the point. Define the problem you want to solve. If you find yourself asking 'Is this allowed?', the answer is likely yes, provided it respects the humans involved."
  },
  {
    title: "Honest Trade-offs",
    content: "We value a deeply considered fragment over a shallow whole. Don't build a login page if the core value is the dashboard. Don't build a backend if the magic is in the interaction. Fake it, hardcode it, wizard-of-oz it. Show us the soul of the idea."
  },
  {
    title: "No Pitch Theatrics",
    content: "When you share your work, speak like a human. No 'disrupting industries', no 'AI-powered synergy'. Tell us why you made it, how it felt to make it, and what you learned. Vulnerability is more interesting than bravado."
  },
  {
    title: "Late Night Code",
    content: "This event is designed for the quiet hours. The visuals are dark, the prompts are introspective. We encourage a pace that is steady and calm, not frantic. Drink water. Stretch. efficient creativity requires a rested mind."
  }
];

export const FOOD_OUTLETS: FoodOutlet[] = [
  {
    id: 'midnight_slice',
    name: 'Midnight Slice',
    description: 'Carbs. Cheese. Grease. The holy trinity.',
    items: [
      { id: 'f1', name: 'Classic Pepperoni', description: 'NY Style. Foldable.', price: '$4.00' },
      { id: 'f2', name: 'White Garlic', description: 'Ricotta, mozzarella, roasted garlic.', price: '$4.50' },
      { id: 'f3', name: 'Garlic Knots (3)', description: 'Drenched in butter.', price: '$3.00' },
      { id: 'f4', name: 'Root Beer', description: 'Ice cold can.', price: '$2.00' }
    ]
  },
  {
    id: 'neon_noodle',
    name: 'Neon Noodle',
    description: 'Warm broth and steamed parcels.',
    items: [
      { id: 'f5', name: 'Spicy Miso Ramen', description: 'Rich broth, chashu, egg.', price: '$12.00' },
      { id: 'f6', name: 'Veggie Gyoza (5)', description: 'Pan-fried.', price: '$6.00' },
      { id: 'f7', name: 'Pork Buns (2)', description: 'Fluffy clouds of savory.', price: '$7.00' },
      { id: 'f8', name: 'Jasmine Tea', description: 'Hot. Keeps you awake.', price: '$2.00' }
    ]
  }
];