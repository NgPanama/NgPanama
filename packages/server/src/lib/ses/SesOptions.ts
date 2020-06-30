export default interface SesOptions {
  toEmailAddresses: [string];
  sourceEmail: string;
  template: string;
  variables?: {};
}
