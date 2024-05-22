import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    this._client.on("connect", () => {
      return new Promise<void>((resolve, reject) => {
        console.log("Connected to NATS");
        this._client!.on("close", () => {
          console.log("NATS connection closed!");
          process.exit();
        });
        resolve();
      });
    });
  }
}
// Export the instance of NatsWrapper
export const natsWrapper = new NatsWrapper();
