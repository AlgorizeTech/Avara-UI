# Form Engine

A high-fidelity Form toolkit engineered for both simple landing pages and complex enterprise dashboards.

This engine decouples layout from state. It provides a stunning visual wrapper with a **slim animated glowing border** that tracks focus, and a custom **glitching error text effect** that draws immediate attention to invalid fields.

## Interactive Showcase

Use the control panel below to test the different implementations.

- The **Basic Native State** demo shows how to easily wrap a simple email input. Try submitting an invalid email to see the custom glitching `FormError` text in action.
- The **Advanced (RHF + Zod)** demo showcases a complex grid layout. Because the `FormWrapper` is unopinionated, it natively accepts the `onSubmit={handleSubmit()}` methods from `react-hook-form` without breaking child `refs`.

---

## Installation

### 1. Copy the Component

This component exports four modular building blocks: `FormWrapper`, `FormField`, `FormError`, and `FormSubmit`.

The high-fidelity styling (the spinning conic gradient and the CSS glitch animations) are self-contained within this file and require no external animation libraries.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/FormBlock.tsx`.

### 2. (Optional) Install React Hook Form & Zod

If you intend to use the advanced enterprise validation shown in the second showcase demo, you will need to install the following packages:

```bash
npm install react-hook-form zod @hookform/resolvers
```

## Usage

1. Advanced Integration (RHF + Zod)
   This is the recommended setup for any form with more than 2 fields. Define your schema, pass the register refs to your inputs, and wrap them in the FormField block to automatically parse and render the glitch error text.

```tsx

// 1. Define strict validation rules
const schema = z.object({
  companyName: z.string().min(2, "Company name is strictly required."),
  workEmail: z.string().email("Invalid corporate email format detected."),
});

export default function EnterpriseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const processData = async (data) => {
    // API Call Logic
    console.log(data);
  };

  return (

        {/* Pass the Zod error message directly to FormField */}

      {/* Automatically handles spinning loading state */}
      Create Account
    
  );
}
```

---

**Component Path:** `nextjs\form\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
