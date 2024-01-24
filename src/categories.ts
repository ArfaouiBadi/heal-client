const categories = [
  {
    key: "0",
    label: "Face",
    data: "Facial Care",
    icon: "pi pi-fw pi-smile",
    children: [
      {
        key: "0-0",
        label: "Moisturizing and Nourishing Care",
        data: "Hydrating and nourishing products for the face",
        icon: "pi pi-fw pi-tint",
        children: [
          {
            key: "0-0-0",
            label: "Moisturizers for all skin types",
            icon: "pi pi-fw pi-file",
            data: "All Skin Types",
          },
          {
            key: "0-0-1",
            label: "Moisturizers for normal to combination skin",
            icon: "pi pi-fw pi-file",
            data: "Normal to Combination Skin",
          },
          // Add other subcategories and products as needed
        ],
      },
      {
        key: "0-1",
        label: "Anti-Aging and Anti-Wrinkle Care",
        data: "Products to combat aging and wrinkles",
        icon: "pi pi-fw pi-hourglass-end",
        children: [
          {
            key: "0-1-0",
            label: "First signs of aging",
            icon: "pi pi-fw pi-file",
            data: "First Signs of Aging",
          },
          {
            key: "0-1-1",
            label: "Established wrinkles",
            icon: "pi pi-fw pi-file",
            data: "Established Wrinkles",
          },
          // Add other subcategories and products as needed
        ],
      },
      // Add other sections like 'Makeup', 'Eyes and Lips', etc., following the same structure
    ],
  },
  {
    key: "1",
    label: "Hair",
    data: "Hair Care",
    icon: "pi pi-fw pi-hair",
    children: [
      {
        key: "1-0",
        label: "Shampoo",
        data: "Hair cleansing products",
        icon: "pi pi-fw pi-shield",
        children: [
          {
            key: "1-0-0",
            label: "Gentle and frequent use shampoo",
            icon: "pi pi-fw pi-file",
            data: "Gentle and Frequent Use Shampoo",
          },
          {
            key: "1-0-1",
            label: "Anti-dandruff shampoo",
            icon: "pi pi-fw pi-file",
            data: "Anti-Dandruff Shampoo",
          },
          // Add other subcategories and products as needed
        ],
      },
      {
        key: "1-1",
        label: "After Shampoo and Hair Care",
        data: "Products for post-shampoo care",
        icon: "pi pi-fw pi-umbrella",
        children: [
          {
            key: "1-1-0",
            label: "Conditioner",
            icon: "pi pi-fw pi-file",
            data: "Hair Conditioner",
          },
          {
            key: "1-1-1",
            label: "Masks and balms",
            icon: "pi pi-fw pi-file",
            data: "Hair Masks and Balms",
          },
          // Add other subcategories and products as needed
        ],
      },
      // Continue with other sections like 'Soins anti-chute', 'Huiles et sérums', etc.
    ],
  },
  // Continue with other top-level categories like 'Body', 'Bébé et maman', 'Compléments alimentaires', 'Homme', 'Hygiène', etc.
];

export default categories;
