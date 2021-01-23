module.exports = {
   purge: [],
   theme: {
      listStyleType: {
         'square': 'square'
      },
      container: {
         padding: "1rem",
      },
      screens: {
         "sm": "640px",
         "md": "768px",
         "lg": "1024px",
         "xl": "1200px"
      },
      maxHeight: {
         '0': '0',
         '1/4': '25%',
         '1/2': '50%',
         '3/4': '75%',
         'full': '100%'
      },
      maxHeight: {
         '0': '0',
         '1/4': '25%',
         '1/2': '50%',
         '3/4': '75%',
         'full': '100%'
      },
      extend: {
         borderColor: {
            'dark-theme': "#a49e89",
            'ingredient': "#cdc6ac"
         },
         backgroundColor: {
            'navbar': "#EAE7DC",
            'ingredient': "#cdc6ac",
            'light-grey': "#D8C3A5",
            'dark-theme': "#a49e89"
         },
         textColor: {
            'navbar': "#8E8D8A",
            'ingredient': "#fdfdfc"
         },
         opacity: {
            "10": "0.1"
         },
         spacing: {
            "72": "18rem",
            "84": "21rem",
            "96": "24rem",
            "recipeImage": "35rem"
         },
         screens: {
            "xs": "500px",
            "smMd": "695px",
            "mdLg": "895px",
            "lgXl": "1150px",
            "2xl": "1440px"
         },
         gridTemplateColumns: {
            "14": "repeat(14, minmax(0, 1fr))",
            "singleRecipe": "auto minmax(0, 1100px) auto",
            "recipeMd": "auto minmax(798px, 730px) auto",
            "singleRecipeMobile": "2% minmax(480px, 1fr) 2%"
         },
         colors: {
            lightBlue: '#9cdbff',
         },
         aspectRatio: { // defaults to {}
            'none': 0,
            'square': [1, 1], // or 1 / 1, or simply 1
            '16/9': [16, 9],  // or 16 / 9
            '4/3': [4, 3],    // or 4 / 3
            '21/9': [21, 9],  // or 21 / 9
         },
         maxHeight: {
            "16": "4rem"
         },
         minHeight: {
            "16": "4rem"
         }
      }
   },
   variants: {
      aspectRatio: ['responsive'],
      variants: {
         backgroundColor: ['responsive', 'hover', 'focus'],
      },
      padding: ['responsive', 'hover', 'focus'],
      opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      display: ['responsive', 'hover', 'focus'],
      zIndex: ['responsive', 'hover', 'focus'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover']
   },
   plugins: [
      require('tailwindcss-aspect-ratio'),
   ],
}
