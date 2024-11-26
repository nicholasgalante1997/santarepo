export default function isSerializable(value: unknown) {
  try {
    JSON.stringify(value);
    return true;
  } catch (e) {
    return false;
  }
}
