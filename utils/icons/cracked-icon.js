import { createIcon } from '@chakra-ui/icons'
// using `path`
export const CrackedEgg = createIcon({
  displayName: 'CrackedEgg',
  viewBox: '0 0 24 24',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 2 12 2C7.58172 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9.5 3.5L12 8L9.5 11L12 14.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  )
})
