export default defineAppConfig({
  ui: {
    primary: 'blue',

    popover: {
      background: 'bg-white dark:bg-neutral-900',
      ring: 'ring-white dark:ring-neutral-600',
      overlay: {
        background: 'bg-white dark:bg-white',
      },
    },
    select: {
      file: {
        base: 'file:bg-gray-50 dark:file:bg-gray-100',
      },
      color: {
        custom: {
          outline:
            'shadow-sm bg-white dark:bg-neutral-900 text-gray-900 dark:text-white ring-1 ring-inset ring-white dark:ring-neutral-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        },
      },

      default: {
        color: 'custom',
      },
    },
  },
});
