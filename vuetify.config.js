const colorPlateCommon = {
  /* ------------------------------------ *\
      $CONSTANCE
  \* ------------------------------------ */
  secondary: '#000000',
  secondary600: '#666666',
  secondary750: '#cccccc',
  secondary900: '#ffffff'
};

const vuetifyConfig = {
  customVariables: ['@/assets/variables.scss', '@/assets/css/typography.scss'],
  treeShake: true,
  theme: {
    light: true,
    themes: {
      light: {
        ...colorPlateCommon
      },
      dark: {
        ...colorPlateCommon
      }
    }
  }
};

module.exports = { vuetifyConfig };
