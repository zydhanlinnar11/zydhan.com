export default function getBaseURL() {
  return process.env.NODE_ENV === 'production'
    ? 'https://zydhan.xyz'
    : 'https://dev.zydhan.xyz'
}
