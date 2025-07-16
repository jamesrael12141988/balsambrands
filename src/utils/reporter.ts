//TO DO: Move to a separate file and import in the test runner
export function sendMockNotification(message: string): void {
  console.log(`[CI NOTIFIER]: ${message}`);
}