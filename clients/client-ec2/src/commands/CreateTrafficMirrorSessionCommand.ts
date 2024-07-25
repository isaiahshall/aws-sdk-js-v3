// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { EC2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EC2Client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateTrafficMirrorSessionRequest, CreateTrafficMirrorSessionResult } from "../models/models_2";
import { de_CreateTrafficMirrorSessionCommand, se_CreateTrafficMirrorSessionCommand } from "../protocols/Aws_ec2";

/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link CreateTrafficMirrorSessionCommand}.
 */
export interface CreateTrafficMirrorSessionCommandInput extends CreateTrafficMirrorSessionRequest {}
/**
 * @public
 *
 * The output of {@link CreateTrafficMirrorSessionCommand}.
 */
export interface CreateTrafficMirrorSessionCommandOutput extends CreateTrafficMirrorSessionResult, __MetadataBearer {}

/**
 * <p>Creates a Traffic Mirror session.</p>
 *          <p>A Traffic Mirror session actively copies packets from a Traffic Mirror source to a Traffic Mirror target. Create a filter, and then assign it
 *          to the session to define a subset of the traffic to mirror, for example all TCP
 *          traffic.</p>
 *          <p>The Traffic Mirror source and the Traffic Mirror target (monitoring appliances) can be in the same VPC, or in a different VPC connected via VPC peering or a transit gateway. </p>
 *          <p>By default, no traffic is mirrored. Use <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateTrafficMirrorFilter.htm">CreateTrafficMirrorFilter</a> to
 *          create filter rules that specify the traffic to mirror.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EC2Client, CreateTrafficMirrorSessionCommand } from "@aws-sdk/client-ec2"; // ES Modules import
 * // const { EC2Client, CreateTrafficMirrorSessionCommand } = require("@aws-sdk/client-ec2"); // CommonJS import
 * const client = new EC2Client(config);
 * const input = { // CreateTrafficMirrorSessionRequest
 *   NetworkInterfaceId: "STRING_VALUE", // required
 *   TrafficMirrorTargetId: "STRING_VALUE", // required
 *   TrafficMirrorFilterId: "STRING_VALUE", // required
 *   PacketLength: Number("int"),
 *   SessionNumber: Number("int"), // required
 *   VirtualNetworkId: Number("int"),
 *   Description: "STRING_VALUE",
 *   TagSpecifications: [ // TagSpecificationList
 *     { // TagSpecification
 *       ResourceType: "capacity-reservation" || "client-vpn-endpoint" || "customer-gateway" || "carrier-gateway" || "coip-pool" || "dedicated-host" || "dhcp-options" || "egress-only-internet-gateway" || "elastic-ip" || "elastic-gpu" || "export-image-task" || "export-instance-task" || "fleet" || "fpga-image" || "host-reservation" || "image" || "import-image-task" || "import-snapshot-task" || "instance" || "instance-event-window" || "internet-gateway" || "ipam" || "ipam-pool" || "ipam-scope" || "ipv4pool-ec2" || "ipv6pool-ec2" || "key-pair" || "launch-template" || "local-gateway" || "local-gateway-route-table" || "local-gateway-virtual-interface" || "local-gateway-virtual-interface-group" || "local-gateway-route-table-vpc-association" || "local-gateway-route-table-virtual-interface-group-association" || "natgateway" || "network-acl" || "network-interface" || "network-insights-analysis" || "network-insights-path" || "network-insights-access-scope" || "network-insights-access-scope-analysis" || "placement-group" || "prefix-list" || "replace-root-volume-task" || "reserved-instances" || "route-table" || "security-group" || "security-group-rule" || "snapshot" || "spot-fleet-request" || "spot-instances-request" || "subnet" || "subnet-cidr-reservation" || "traffic-mirror-filter" || "traffic-mirror-session" || "traffic-mirror-target" || "transit-gateway" || "transit-gateway-attachment" || "transit-gateway-connect-peer" || "transit-gateway-multicast-domain" || "transit-gateway-policy-table" || "transit-gateway-route-table" || "transit-gateway-route-table-announcement" || "volume" || "vpc" || "vpc-endpoint" || "vpc-endpoint-connection" || "vpc-endpoint-service" || "vpc-endpoint-service-permission" || "vpc-peering-connection" || "vpn-connection" || "vpn-gateway" || "vpc-flow-log" || "capacity-reservation-fleet" || "traffic-mirror-filter-rule" || "vpc-endpoint-connection-device-type" || "verified-access-instance" || "verified-access-group" || "verified-access-endpoint" || "verified-access-policy" || "verified-access-trust-provider" || "vpn-connection-device-type" || "vpc-block-public-access-exclusion" || "ipam-resource-discovery" || "ipam-resource-discovery-association" || "instance-connect-endpoint" || "ipam-external-resource-verification-token",
 *       Tags: [ // TagList
 *         { // Tag
 *           Key: "STRING_VALUE",
 *           Value: "STRING_VALUE",
 *         },
 *       ],
 *     },
 *   ],
 *   DryRun: true || false,
 *   ClientToken: "STRING_VALUE",
 * };
 * const command = new CreateTrafficMirrorSessionCommand(input);
 * const response = await client.send(command);
 * // { // CreateTrafficMirrorSessionResult
 * //   TrafficMirrorSession: { // TrafficMirrorSession
 * //     TrafficMirrorSessionId: "STRING_VALUE",
 * //     TrafficMirrorTargetId: "STRING_VALUE",
 * //     TrafficMirrorFilterId: "STRING_VALUE",
 * //     NetworkInterfaceId: "STRING_VALUE",
 * //     OwnerId: "STRING_VALUE",
 * //     PacketLength: Number("int"),
 * //     SessionNumber: Number("int"),
 * //     VirtualNetworkId: Number("int"),
 * //     Description: "STRING_VALUE",
 * //     Tags: [ // TagList
 * //       { // Tag
 * //         Key: "STRING_VALUE",
 * //         Value: "STRING_VALUE",
 * //       },
 * //     ],
 * //   },
 * //   ClientToken: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param CreateTrafficMirrorSessionCommandInput - {@link CreateTrafficMirrorSessionCommandInput}
 * @returns {@link CreateTrafficMirrorSessionCommandOutput}
 * @see {@link CreateTrafficMirrorSessionCommandInput} for command's `input` shape.
 * @see {@link CreateTrafficMirrorSessionCommandOutput} for command's `response` shape.
 * @see {@link EC2ClientResolvedConfig | config} for EC2Client's `config` shape.
 *
 * @throws {@link EC2ServiceException}
 * <p>Base exception class for all service exceptions from EC2 service.</p>
 *
 * @public
 */
export class CreateTrafficMirrorSessionCommand extends $Command
  .classBuilder<
    CreateTrafficMirrorSessionCommandInput,
    CreateTrafficMirrorSessionCommandOutput,
    EC2ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
  })
  .m(function (this: any, Command: any, cs: any, config: EC2ClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("AmazonEC2", "CreateTrafficMirrorSession", {})
  .n("EC2Client", "CreateTrafficMirrorSessionCommand")
  .f(void 0, void 0)
  .ser(se_CreateTrafficMirrorSessionCommand)
  .de(de_CreateTrafficMirrorSessionCommand)
  .build() {}
