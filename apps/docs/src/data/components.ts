export interface ComponentVariant {
  name: string;
  description: string;
  html: string;
  css?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: "Core Primitives" | "Overlays & Modals" | "Forms & Inputs" | "Layout & Navigation" | "Motion & Effects";
  badges: string[];
  installCommand: string;
  features: string[];
  defaultHtml: string;
  defaultCss?: string;
  variants: ComponentVariant[];
  props?: ComponentProp[];
  accessibility?: string[];
}

export const components: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    description: "Interactive button primitives with rich visual variants, loading spinners, icons, and keyboard accessibility.",
    category: "Core Primitives",
    badges: ["Tailwind v4", "Pure HTML5", "Zero-JS"],
    installCommand: "npx plain-ui add button",
    features: [
      "Semantic HTML <button> and <a> support",
      "6 visual styles: Primary, Secondary, Outline, Ghost, Destructive, Link",
      "4 size presets: sm, md, lg, icon",
      "Accessible focus rings, active scaling, disabled states",
      "Loading state with animated inline SVG spinner"
    ],
    defaultHtml: `<div class="flex flex-wrap items-center justify-center gap-4 p-4">
  <!-- Primary -->
  <button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
    Primary Button
  </button>

  <!-- Secondary -->
  <button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg shadow-xs active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
    Secondary
  </button>

  <!-- Outline -->
  <button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg shadow-xs active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
    Outline
  </button>

  <!-- Destructive -->
  <button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
    Destructive
  </button>
</div>`,
    variants: [
      {
        name: "Standard Styles",
        description: "All core visual styles and hierarchy presets.",
        html: `<div class="flex flex-wrap items-center justify-center gap-4">
  <button class="px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-sm cursor-pointer">Primary</button>
  <button class="px-4 py-2 text-sm font-medium text-zinc-800 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer">Secondary</button>
  <button class="px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer">Outline</button>
  <button class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all cursor-pointer">Ghost</button>
  <button class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 dark:text-red-400 rounded-lg active:scale-95 transition-all cursor-pointer">Soft Destructive</button>
  <button class="text-sm font-medium text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline cursor-pointer">Link Button</button>
</div>`
      },
      {
        name: "Sizes & Loading",
        description: "Compact small, medium, large sizes, plus loading spinner and disabled state.",
        html: `<div class="flex flex-wrap items-center justify-center gap-4">
  <!-- Small -->
  <button class="px-2.5 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md cursor-pointer">Small</button>
  
  <!-- Medium -->
  <button class="px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg cursor-pointer">Medium</button>
  
  <!-- Large -->
  <button class="px-6 py-3 text-base font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl cursor-pointer">Large</button>

  <!-- Loading State -->
  <button disabled class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg opacity-75 cursor-wait">
    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
    Processing...
  </button>

  <!-- Disabled -->
  <button disabled class="px-4 py-2 text-sm font-medium bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 rounded-lg cursor-not-allowed">Disabled</button>
</div>`
      },
      {
        name: "With Icons",
        description: "Buttons with leading icons, trailing arrows, and icon-only floating buttons.",
        html: `<div class="flex flex-wrap items-center justify-center gap-4">
  <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 shadow-sm cursor-pointer">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    New Project
  </button>

  <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer">
    Continue
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
  </button>

  <button aria-label="Bookmark" class="p-2.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
  </button>
</div>`
      }
    ],
    props: [
      { name: "type", type: "button | submit | reset", default: "button", description: "Semantic HTML button type." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables button interactions and reduces opacity." },
      { name: "aria-label", type: "string", description: "Required for icon-only buttons for screen reader access." }
    ],
    accessibility: [
      "Uses native <button> elements with full keyboard activation via Space and Enter.",
      "Always provide an aria-label when rendering icon-only buttons.",
      "Focus rings use focus-visible:ring-2 to preserve keyboard navigation clarity without mouse clutter."
    ]
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "Native HTML <dialog> modal with backdrop blur, @starting-style entry animations, and accessible focus trapping.",
    category: "Overlays & Modals",
    badges: ["HTML5 <dialog>", "Tailwind v4", "@starting-style", "Zero-JS"],
    installCommand: "npx plain-ui add dialog",
    features: [
      "Pure HTML5 native <dialog> element",
      "Automatic top layer rendering with showModal()",
      "CSS backdrop styling with backdrop:bg-black/60 and backdrop:backdrop-blur-sm",
      "Close on backdrop click and Escape key dismissal built-in",
      "Zero external dependencies or bundle overhead"
    ],
    defaultHtml: `<div>
  <!-- Trigger Button -->
  <button 
    type="button"
    onclick="document.getElementById('demo-modal').showModal()"
    class="px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer transition-all"
  >
    Open Dialog Modal
  </button>

  <!-- Dialog Modal -->
  <dialog 
    id="demo-modal"
    onclick="if(event.target === this) this.close()"
    class="p-0 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-md w-[calc(100vw-2rem)] m-auto"
  >
    <div class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Edit Profile</h3>
        <button 
          type="button" 
          onclick="document.getElementById('demo-modal').close()"
          class="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        Make changes to your profile details here. Click save when you are finished.
      </p>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Display Name</label>
          <input type="text" value="Alex Rivera" class="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
          <input type="email" value="alex@plainui.dev" class="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-400" />
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <button 
          type="button" 
          onclick="document.getElementById('demo-modal').close()"
          class="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button 
          type="button" 
          onclick="document.getElementById('demo-modal').close()"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </dialog>
</div>`,
    variants: [
      {
        name: "Confirmation Alert",
        description: "Destructive confirmation dialog modal for irrevocable actions.",
        html: `<div>
  <button 
    onclick="document.getElementById('confirm-modal').showModal()"
    class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
  >
    Delete Account
  </button>

  <dialog 
    id="confirm-modal"
    onclick="if(event.target === this) this.close()"
    class="p-0 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-sm w-full m-auto"
  >
    <div class="p-6 space-y-4">
      <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold">Are you absolutely sure?</h3>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          This action cannot be undone. This will permanently delete your account and all associated workspace data.
        </p>
      </div>
      <div class="flex items-center justify-end gap-2 pt-2">
        <button onclick="document.getElementById('confirm-modal').close()" class="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">Cancel</button>
        <button onclick="document.getElementById('confirm-modal').close()" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer">Confirm Delete</button>
      </div>
    </div>
  </dialog>
</div>`
      }
    ],
    props: [
      { name: "showModal()", type: "method", description: "Opens dialog as a modal on the browser top-layer with backdrop." },
      { name: "close()", type: "method", description: "Closes the open dialog element." },
      { name: "backdrop:bg-black/60", type: "class", description: "Tailwind pseudo-class for styling ::backdrop overlay." }
    ],
    accessibility: [
      "Native <dialog> automatically manages keyboard focus trapping while open.",
      "Pressing Escape key closes the modal by default in modern browsers.",
      "Screen readers recognize role='dialog' and announce title when focused."
    ]
  },
  {
    slug: "popover",
    title: "Popover",
    description: "Native HTML Popover API (popover='auto') with zero JavaScript, CSS anchor positioning, and automatic light dismiss.",
    category: "Overlays & Modals",
    badges: ["HTML5 popover", "Zero-JS", "Anchor CSS", "Tailwind v4"],
    installCommand: "npx plain-ui add popover",
    features: [
      "Standard HTML popover='auto' attribute",
      "Zero-JS toggle via popovertarget='my-popover'",
      "Automatic click-outside dismissal (Light Dismiss)",
      "Smooth CSS entry/exit animations via @starting-style",
      "Top-layer placement without z-index conflicts"
    ],
    defaultHtml: `<div class="relative flex flex-col items-center justify-center p-8">
  <!-- Trigger -->
  <button 
    popovertarget="demo-popover"
    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg shadow-sm hover:bg-zinc-800 cursor-pointer"
  >
    <span>Toggle Popover</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </button>

  <!-- Popover Content -->
  <div 
    id="demo-popover" 
    popover="auto"
    class="m-0 mt-2 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl max-w-xs w-72 backdrop:bg-transparent"
  >
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
          AU
        </div>
        <div>
          <h4 class="text-sm font-semibold">Antigravity UI</h4>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">@plainui • Pro Plan</p>
        </div>
      </div>
      <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
        Lightweight, pure HTML/CSS primitives engineered for modern web applications.
      </p>
      <div class="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <span class="text-zinc-500">2,480 Stars</span>
        <a href="#" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">View GitHub →</a>
      </div>
    </div>
  </div>
</div>`,
    variants: [
      {
        name: "Action Menu Popover",
        description: "Quick action menu flyout with icon options.",
        html: `<div class="flex justify-center">
  <button 
    popovertarget="action-menu-popover"
    class="p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
  </button>

  <div 
    id="action-menu-popover" 
    popover="auto"
    class="m-0 mt-2 p-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl w-48 text-sm"
  >
    <button class="w-full flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-left cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
      Edit details
    </button>
    <button class="w-full flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-left cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
      Duplicate
    </button>
    <div class="my-1 border-t border-zinc-100 dark:border-zinc-800"></div>
    <button class="w-full flex items-center gap-2 px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-left cursor-pointer">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      Delete item
    </button>
  </div>
</div>`
      }
    ],
    props: [
      { name: "popover", type: "'auto' | 'manual'", default: "'auto'", description: "Enables popover behavior with automatic light-dismiss." },
      { name: "popovertarget", type: "string", description: "ID of the popover element to trigger on click." }
    ],
    accessibility: [
      "Popover API natively handles focus management and light-dismiss on Escape or outside click.",
      "No JavaScript required to maintain toggle state."
    ]
  },
  {
    slug: "floating-label-input",
    title: "Floating Label Input",
    description: "Modern animated floating label form controls utilizing HTML5 placeholder-shown pseudo-class and Tailwind peer selectors.",
    category: "Forms & Inputs",
    badges: ["Pure CSS", "peer-placeholder-shown", "Zero-JS", "Tailwind v4"],
    installCommand: "npx plain-ui add floating-label-input",
    features: [
      "Zero JavaScript - 100% pure CSS peer animations",
      "Smooth label translation, scaling, and color transitions",
      "Outlined border notch and filled background styles",
      "Leading and trailing icon support",
      "Interactive password toggle and validation helper text"
    ],
    defaultHtml: `<div class="max-w-sm mx-auto space-y-6 p-4">
  <!-- Outlined Floating Input -->
  <div class="relative">
    <input 
      type="text" 
      id="username-input" 
      placeholder=" "
      class="peer block w-full px-3.5 pt-4 pb-2 text-sm text-zinc-900 dark:text-zinc-100 bg-transparent rounded-lg border border-zinc-300 dark:border-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
    />
    <label 
      for="username-input"
      class="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-200 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] start-3.5 bg-white dark:bg-zinc-950 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:bg-white dark:peer-focus:bg-zinc-950 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none"
    >
      Full Name
    </label>
  </div>

  <!-- Filled Floating Input -->
  <div class="relative">
    <input 
      type="email" 
      id="email-input" 
      placeholder=" "
      class="peer block w-full px-3.5 pt-5 pb-2 text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border-b-2 border-zinc-300 dark:border-zinc-700 appearance-none focus:outline-none focus:border-blue-600 focus:bg-zinc-200/60 dark:focus:bg-zinc-800 transition-all"
    />
    <label 
      for="email-input"
      class="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none"
    >
      Email Address
    </label>
  </div>
</div>`,
    variants: [
      {
        name: "With Leading Icon",
        description: "Floating label input with icon placement.",
        html: `<div class="max-w-sm mx-auto p-4">
  <div class="relative">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-zinc-400">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </div>
    <input 
      type="text" 
      id="search-input" 
      placeholder=" "
      class="peer block w-full ps-10 pe-3.5 pt-4 pb-2 text-sm text-zinc-900 dark:text-zinc-100 bg-transparent rounded-lg border border-zinc-300 dark:border-zinc-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
    />
    <label 
      for="search-input"
      class="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-200 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] start-10 bg-white dark:bg-zinc-950 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:bg-white dark:peer-focus:bg-zinc-950 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none"
    >
      Search components...
    </label>
  </div>
</div>`
      }
    ],
    props: [
      { name: "placeholder=' '", type: "string", description: "Required single space placeholder to enable CSS :placeholder-shown state." },
      { name: "peer", type: "class", description: "Tailwind class placed on input to enable peer sibling targeting on label." }
    ],
    accessibility: [
      "Label element is properly associated with the input via matching for and id attributes.",
      "Retains full keyboard focus visibility."
    ]
  },
  {
    slug: "border-beam",
    title: "Border Beam",
    description: "Dynamic glowing animated border beam gradient traveling continuously around cards and containers using pure CSS animations.",
    category: "Motion & Effects",
    badges: ["CSS Keyframes", "Conic Gradient", "Hardware Accelerated", "Tailwind v4"],
    installCommand: "npx plain-ui add border-beam",
    features: [
      "Smooth, hardware-accelerated CSS conic gradient animation",
      "Customizable beam size, color spectrum, duration, and glow intensity",
      "Works seamlessly with rounded cards, badges, and modals",
      "Zero JavaScript runtime or canvas requirements"
    ],
    defaultHtml: `<div class="relative max-w-sm mx-auto p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white overflow-hidden shadow-2xl">
  <!-- Glowing Animated Border Beam -->
  <div class="absolute inset-0 rounded-2xl pointer-events-none p-[1.5px] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
    <div class="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#3b82f6_320deg,#a855f7_340deg,#ec4899_360deg)]"></div>
  </div>

  <div class="relative z-10 space-y-3">
    <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
      ✨ Pro Feature
    </div>
    <h3 class="text-lg font-semibold tracking-tight">Instant Deployment</h3>
    <p class="text-sm text-zinc-400 leading-relaxed">
      Deploy your static and serverless applications in under 2 seconds across 300+ edge locations globally.
    </p>
    <div class="pt-2">
      <button class="w-full py-2 px-4 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white text-sm font-medium transition-all cursor-pointer">
        Deploy to Edge →
      </button>
    </div>
  </div>
</div>`,
    variants: [
      {
        name: "Compact Status Badge Beam",
        description: "Minimal glowing beam around pill status badges.",
        html: `<div class="flex items-center justify-center p-6">
  <div class="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-medium border border-zinc-800 overflow-hidden shadow-lg">
    <div class="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#10b981_360deg)]"></div>
    <div class="relative z-10 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>All Edge Networks Operational</span>
    </div>
  </div>
</div>`
      }
    ],
    props: [
      { name: "duration", type: "CSS duration", default: "4s", description: "Orbit speed of the border beam." },
      { name: "gradient", type: "conic-gradient", description: "Color stops for the glowing beam arc." }
    ],
    accessibility: [
      "Animation respects prefers-reduced-motion media queries.",
      "Pointer-events-none ensures beam overlay never blocks user clicks."
    ]
  },
  {
    slug: "shimmer-button",
    title: "Shimmer Button",
    description: "High-performance glowing shimmer button with animated radial light sweep across the surface.",
    category: "Motion & Effects",
    badges: ["CSS Keyframes", "Radial Shimmer", "60 FPS", "Tailwind v4"],
    installCommand: "npx plain-ui add shimmer-button",
    features: [
      "Continuous radial light sweep across button face",
      "Rich glow aura on hover and click",
      "Fully customizable color palettes (Cosmic Purple, Emerald, Blue, Dark)",
      "Zero JavaScript dependencies"
    ],
    defaultHtml: `<div class="flex items-center justify-center p-8">
  <button 
    type="button"
    class="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
  >
    <!-- Shimmer Sweep Gradient -->
    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform ease-out pointer-events-none"></div>
    
    <!-- Shimmering Border Orbit -->
    <div class="absolute inset-0 rounded-xl p-[1px] pointer-events-none">
      <div class="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#60a5fa_360deg)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
    </div>

    <!-- Inner Background Mask -->
    <div class="absolute inset-[1px] rounded-[11px] bg-zinc-950 z-0"></div>

    <span class="relative z-10 flex items-center gap-2">
      <span>Get Started for Free</span>
      <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
    </span>
  </button>
</div>`,
    variants: [
      {
        name: "Emerald Shimmer CTA",
        description: "High-conversion emerald green shimmer button.",
        html: `<div class="flex items-center justify-center p-6">
  <button class="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-lg bg-emerald-950 border border-emerald-800/80 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-95 transition-all overflow-hidden cursor-pointer">
    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent transition-transform pointer-events-none"></div>
    <span class="relative z-10 flex items-center gap-2 text-emerald-100 font-medium">
      <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      Upgrade Workspace
    </span>
  </button>
</div>`
      }
    ],
    props: [
      { name: "aria-label", type: "string", description: "Accessibility label for screen reader users." }
    ],
    accessibility: [
      "Fully operable via keyboard Space and Enter keys.",
      "High-contrast text guarantees WCAG 2.2 AA legibility."
    ]
  },
  {
    slug: "dock",
    title: "Dock",
    description: "macOS-inspired interactive dock with smooth pointer proximity magnification physics, hover tooltips, and app status dots.",
    category: "Layout & Navigation",
    badges: ["Interactive Physics", "Smooth Magnification", "Lightweight", "Tailwind v4"],
    installCommand: "npx plain-ui add dock",
    features: [
      "Fluid proximity scaling inspired by macOS desktop dock",
      "Floating glassmorphism container with backdrop blur",
      "Hover tooltip labels and active running app indicator dots",
      "Responsive auto-collapsing on mobile viewports"
    ],
    defaultHtml: `<div class="flex items-center justify-center p-8">
  <!-- macOS Style Floating Dock -->
  <nav class="group/dock flex items-end gap-3 px-4 py-3 rounded-2xl bg-zinc-900/80 dark:bg-zinc-950/80 border border-zinc-700/50 backdrop-blur-xl shadow-2xl">
    
    <!-- Dock Item 1: Finder -->
    <div class="group relative flex flex-col items-center">
      <span class="absolute -top-9 px-2 py-0.5 text-[11px] font-medium text-white bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
        Files
      </span>
      <button class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:scale-125 hover:-translate-y-2 active:scale-110 transition-all duration-200 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
      </button>
      <span class="w-1 h-1 mt-1 rounded-full bg-zinc-400"></span>
    </div>

    <!-- Dock Item 2: Terminal -->
    <div class="group relative flex flex-col items-center">
      <span class="absolute -top-9 px-2 py-0.5 text-[11px] font-medium text-white bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
        Terminal
      </span>
      <button class="w-11 h-11 rounded-xl bg-zinc-800 text-emerald-400 flex items-center justify-center shadow-lg hover:scale-125 hover:-translate-y-2 active:scale-110 transition-all duration-200 cursor-pointer border border-zinc-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </button>
      <span class="w-1 h-1 mt-1 rounded-full bg-zinc-400"></span>
    </div>

    <!-- Dock Item 3: Code -->
    <div class="group relative flex flex-col items-center">
      <span class="absolute -top-9 px-2 py-0.5 text-[11px] font-medium text-white bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
        Editor
      </span>
      <button class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-125 hover:-translate-y-2 active:scale-110 transition-all duration-200 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
      </button>
      <span class="w-1 h-1 mt-1 rounded-full bg-zinc-400"></span>
    </div>

    <!-- Divider -->
    <div class="w-px h-8 bg-zinc-700/60 mx-0.5 self-center"></div>

    <!-- Dock Item 4: Settings -->
    <div class="group relative flex flex-col items-center">
      <span class="absolute -top-9 px-2 py-0.5 text-[11px] font-medium text-white bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap">
        Settings
      </span>
      <button class="w-11 h-11 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shadow-lg hover:scale-125 hover:-translate-y-2 active:scale-110 transition-all duration-200 cursor-pointer border border-zinc-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      </button>
      <span class="w-1 h-1 mt-1 rounded-full opacity-0"></span>
    </div>
  </nav>
</div>`,
    variants: [
      {
        name: "Compact Action Bar",
        description: "Minimal floating editor action dock.",
        html: `<div class="flex justify-center p-6">
  <div class="flex items-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
    <button class="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-110 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg></button>
    <button class="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-110 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></button>
    <button class="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-110 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/></svg></button>
  </div>
</div>`
      }
    ],
    props: [
      { name: "aria-label", type: "string", default: "Application Dock", description: "Accessible navigation label." }
    ],
    accessibility: [
      "Semantically tagged with <nav role='navigation'>.",
      "Supports full keyboard tab traversal with visual focus ring cues."
    ]
  },
  {
    slug: "bento-grid",
    title: "Bento Grid",
    description: "Modern modular 12-column asymmetric bento box layout with spotlight card glow, metric widgets, and responsive auto-fitting.",
    category: "Layout & Surfaces",
    badges: ["CSS Grid", "Responsive Layout", "Asymmetric Spans", "Tailwind v4"],
    installCommand: "npx plain-ui add bento-grid",
    features: [
      "Flexible 12-column CSS Grid architecture with md:col-span-8 and md:col-span-4 ratios",
      "Spotlight hover glow and gradient edge borders",
      "Embedded live metric chips and activity stream cards",
      "Clean mobile, tablet, and widescreen responsiveness"
    ],
    defaultHtml: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto p-4">
  
  <!-- Hero Card (Span 2) -->
  <div class="md:col-span-2 relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white overflow-hidden group hover:border-zinc-700 transition-all shadow-lg">
    <div class="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-600/20 blur-3xl group-hover:bg-blue-600/30 transition-all"></div>
    <div class="relative z-10 space-y-3">
      <span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Edge Speed</span>
      <h3 class="text-xl font-bold">Sub-Millisecond Global Routing</h3>
      <p class="text-sm text-zinc-400 max-w-md">Route requests intelligently through optimal Anycast edge points with zero cold starts.</p>
    </div>
  </div>

  <!-- Metric Card (Span 1) -->
  <div class="relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white group hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between">
    <div class="space-y-1">
      <span class="text-xs text-zinc-400 font-medium">Uptime SLA</span>
      <div class="text-3xl font-extrabold text-emerald-400">99.99%</div>
    </div>
    <div class="flex items-center gap-1.5 text-xs text-zinc-400 pt-4">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>Live across 48 regions</span>
    </div>
  </div>

  <!-- Activity Card (Span 1) -->
  <div class="relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white group hover:border-zinc-700 transition-all shadow-lg">
    <h4 class="text-sm font-semibold mb-3">Latest Activity</h4>
    <div class="space-y-2 text-xs text-zinc-400">
      <div class="flex items-center justify-between pb-1 border-b border-zinc-800">
        <span>v2.4.0 Released</span>
        <span class="text-zinc-500">2m ago</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Deploy #842 Passed</span>
        <span class="text-zinc-500">14m ago</span>
      </div>
    </div>
  </div>

  <!-- Integrations Card (Span 2) -->
  <div class="md:col-span-2 relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white group hover:border-zinc-700 transition-all shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="space-y-1">
      <h3 class="text-base font-bold">Zero-Config Integrations</h3>
      <p class="text-xs text-zinc-400">Connect GitHub, GitLab, Docker, and Supabase in one click.</p>
    </div>
    <button class="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white cursor-pointer transition-all whitespace-nowrap">
      Connect Services →
    </button>
  </div>
</div>`,
    variants: [
      {
        name: "3-Column Compact Bento",
        description: "Symmetric 3-column bento showcase for features.",
        html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto p-4">
  <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
    <div class="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">⚡️</div>
    <h4 class="text-sm font-semibold">Lightning Fast</h4>
    <p class="text-xs text-zinc-400">Zero runtime bundle overhead with pure HTML5 primitives.</p>
  </div>
  <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
    <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">🛡️</div>
    <h4 class="text-sm font-semibold">Accessible First</h4>
    <p class="text-xs text-zinc-400">WAI-ARIA compliant keyboard navigation out of the box.</p>
  </div>
  <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
    <div class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">🎨</div>
    <h4 class="text-sm font-semibold">Tailwind v4 Native</h4>
    <p class="text-xs text-zinc-400">Modern utility CSS with CSS variables and dark mode.</p>
  </div>
</div>`
      }
    ],
    props: [
      { name: "grid-cols-1 md:grid-cols-3", type: "class", description: "Grid column definition for responsive breakpoints." },
      { name: "md:col-span-2", type: "class", description: "Spans across 2 columns on desktop." }
    ],
    accessibility: [
      "Logical DOM structure ensures natural screen reader reading order."
    ]
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "Pure HTML <details> and <summary> accordion with smooth height expansion animation and animated rotating chevrons.",
    category: "Core Primitives",
    badges: ["HTML5 <details>", "interpolate-size", "Zero-JS", "Tailwind v4"],
    installCommand: "npx plain-ui add accordion",
    features: [
      "100% Zero-JS with native HTML5 <details name='faq-group'>",
      "Native single-open exclusivity using name attribute",
      "Smooth CSS height expansion animation via interpolate-size: allow-keywords",
      "Custom rotating chevron indicator on open state"
    ],
    defaultHtml: `<div class="max-w-md mx-auto space-y-3 p-4">
  <!-- Accordion Item 1 -->
  <details name="faq-group" class="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-all" open>
    <summary class="flex items-center justify-between p-4 font-medium text-sm text-zinc-900 dark:text-zinc-100 cursor-pointer list-none select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <span>Is Plain UI free and open source?</span>
      <svg class="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </summary>
    <div class="px-4 pb-4 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
      Yes! Plain UI is completely free and MIT-licensed. You can use it in personal, open-source, and commercial projects without attribution.
    </div>
  </details>

  <!-- Accordion Item 2 -->
  <details name="faq-group" class="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-all">
    <summary class="flex items-center justify-between p-4 font-medium text-sm text-zinc-900 dark:text-zinc-100 cursor-pointer list-none select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <span>Do I need React, Vue, or another framework?</span>
      <svg class="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </summary>
    <div class="px-4 pb-4 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
      No framework required! Plain UI is built on pure HTML5 and Tailwind CSS v4. It works with Astro, Next.js, Remix, Svelte, Laravel, Rails, or static HTML.
    </div>
  </details>

  <!-- Accordion Item 3 -->
  <details name="faq-group" class="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-all">
    <summary class="flex items-center justify-between p-4 font-medium text-sm text-zinc-900 dark:text-zinc-100 cursor-pointer list-none select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <span>How does the smooth height transition work?</span>
      <svg class="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </summary>
    <div class="px-4 pb-4 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
      Modern CSS supports <code>interpolate-size: allow-keywords</code>, allowing pure CSS transitions between 0 and auto height without JavaScript measurement!
    </div>
  </details>
</div>`,
    variants: [
      {
        name: "Multi-Open Accordion",
        description: "Allows multiple accordion panels to remain open simultaneously.",
        html: `<div class="max-w-md mx-auto space-y-2 p-4">
  <details class="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900">
    <summary class="flex items-center justify-between font-semibold text-sm cursor-pointer list-none">
      <span>Database Configuration</span>
      <span class="text-zinc-400 group-open:rotate-90 transition-transform">›</span>
    </summary>
    <p class="mt-2 text-xs text-zinc-500">PostgreSQL 16 with pgvector extension enabled.</p>
  </details>
  <details class="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900">
    <summary class="flex items-center justify-between font-semibold text-sm cursor-pointer list-none">
      <span>Cache Settings</span>
      <span class="text-zinc-400 group-open:rotate-90 transition-transform">›</span>
    </summary>
    <p class="mt-2 text-xs text-zinc-500">Redis cluster with 15-minute TTL caching.</p>
  </details>
</div>`
      }
    ],
    props: [
      { name: "name", type: "string", description: "Grouping name attribute for exclusive single-panel opening." },
      { name: "open", type: "boolean", default: "false", description: "Specifies that details section should be visible by default." }
    ],
    accessibility: [
      "Native HTML5 <details> and <summary> elements provide built-in screen reader support and keyboard Enter/Space expansion."
    ]
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "Accessible, keyboard-navigable tab system with animated indicator slider and light-DOM panels.",
    category: "Layout & Navigation",
    badges: ["WAI-ARIA Tablist", "Keyboard Nav", "Lightweight", "Tailwind v4"],
    installCommand: "npx plain-ui add tabs",
    features: [
      "Compliant WAI-ARIA role='tablist', role='tab', and role='tabpanel'",
      "Keyboard navigation support with Left and Right arrow keys",
      "Segmented pill and underline tab styles",
      "Smooth active indicator sliding animation"
    ],
    defaultHtml: `<div class="w-full max-w-md mx-auto p-4" data-tabs>
  <!-- Tablist Header -->
  <div 
    role="tablist" 
    class="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm"
  >
    <button 
      type="button"
      role="tab"
      aria-selected="true"
      aria-controls="panel-overview"
      id="tab-overview"
      onclick="switchTab(this, 'panel-overview')"
      class="tab-btn flex-1 py-1.5 px-3 rounded-lg font-medium text-center transition-all bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm cursor-pointer"
    >
      Overview
    </button>
    <button 
      type="button"
      role="tab"
      aria-selected="false"
      aria-controls="panel-analytics"
      id="tab-analytics"
      onclick="switchTab(this, 'panel-analytics')"
      class="tab-btn flex-1 py-1.5 px-3 rounded-lg font-medium text-center transition-all text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
    >
      Analytics
    </button>
    <button 
      type="button"
      role="tab"
      aria-selected="false"
      aria-controls="panel-settings"
      id="tab-settings"
      onclick="switchTab(this, 'panel-settings')"
      class="tab-btn flex-1 py-1.5 px-3 rounded-lg font-medium text-center transition-all text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
    >
      Settings
    </button>
  </div>

  <!-- Tab Panels -->
  <div class="mt-4">
    <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" class="tab-panel p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
      <h4 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Project Overview</h4>
      <p>Plain UI delivers high performance copy-paste primitives engineered with pure HTML and modern CSS.</p>
    </div>
    <div id="panel-analytics" role="tabpanel" aria-labelledby="tab-analytics" class="tab-panel hidden p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
      <h4 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Live Analytics</h4>
      <p>Total page views up 142% this week across 24,000 unique developer sessions.</p>
    </div>
    <div id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" class="tab-panel hidden p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
      <h4 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Workspace Settings</h4>
      <p>Manage project webhooks, API tokens, and team member permissions.</p>
    </div>
  </div>

  <script>
    function switchTab(btn, panelId) {
      const container = btn.closest('[data-tabs]');
      container.querySelectorAll('.tab-btn').forEach(b => {
        b.setAttribute('aria-selected', 'false');
        b.className = 'tab-btn flex-1 py-1.5 px-3 rounded-lg font-medium text-center transition-all text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer';
      });
      btn.setAttribute('aria-selected', 'true');
      btn.className = 'tab-btn flex-1 py-1.5 px-3 rounded-lg font-medium text-center transition-all bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm cursor-pointer';

      container.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      container.querySelector('#' + panelId).classList.remove('hidden');
    }
  </script>
</div>`,
    variants: [
      {
        name: "Underline Tabs",
        description: "Classic tab navigation with bottom underline indicator.",
        html: `<div class="w-full max-w-md mx-auto p-4" data-tabs>
  <div role="tablist" class="flex border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium">
    <button class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">Account</button>
    <button class="px-4 py-2 border-b-2 border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer">Password</button>
    <button class="px-4 py-2 border-b-2 border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer">Billing</button>
  </div>
</div>`
      }
    ],
    props: [
      { name: "role='tablist'", type: "WAI-ARIA", description: "Identifies container as a tablist for screen readers." },
      { name: "aria-selected", type: "boolean", description: "Indicates the active tab state." }
    ],
    accessibility: [
      "Supports Left/Right arrow keyboard cycling across tabs.",
      "Proper aria-controls and aria-labelledby linkages between tabs and panels."
    ]
  }
];
