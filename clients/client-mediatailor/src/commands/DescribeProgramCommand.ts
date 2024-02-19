// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { commonParams } from "../endpoint/EndpointParameters";
import { MediaTailorClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../MediaTailorClient";
import { DescribeProgramRequest, DescribeProgramResponse } from "../models/models_0";
import { de_DescribeProgramCommand, se_DescribeProgramCommand } from "../protocols/Aws_restJson1";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link DescribeProgramCommand}.
 */
export interface DescribeProgramCommandInput extends DescribeProgramRequest {}
/**
 * @public
 *
 * The output of {@link DescribeProgramCommand}.
 */
export interface DescribeProgramCommandOutput extends DescribeProgramResponse, __MetadataBearer {}

/**
 * @public
 * <p>Describes a program within a channel. For information about programs, see <a href="https://docs.aws.amazon.com/mediatailor/latest/ug/channel-assembly-programs.html">Working with programs</a> in the <i>MediaTailor User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { MediaTailorClient, DescribeProgramCommand } from "@aws-sdk/client-mediatailor"; // ES Modules import
 * // const { MediaTailorClient, DescribeProgramCommand } = require("@aws-sdk/client-mediatailor"); // CommonJS import
 * const client = new MediaTailorClient(config);
 * const input = { // DescribeProgramRequest
 *   ChannelName: "STRING_VALUE", // required
 *   ProgramName: "STRING_VALUE", // required
 * };
 * const command = new DescribeProgramCommand(input);
 * const response = await client.send(command);
 * // { // DescribeProgramResponse
 * //   AdBreaks: [ // __listOfAdBreak
 * //     { // AdBreak
 * //       MessageType: "SPLICE_INSERT" || "TIME_SIGNAL",
 * //       OffsetMillis: Number("long"), // required
 * //       Slate: { // SlateSource
 * //         SourceLocationName: "STRING_VALUE",
 * //         VodSourceName: "STRING_VALUE",
 * //       },
 * //       SpliceInsertMessage: { // SpliceInsertMessage
 * //         AvailNum: Number("int"),
 * //         AvailsExpected: Number("int"),
 * //         SpliceEventId: Number("int"),
 * //         UniqueProgramId: Number("int"),
 * //       },
 * //       TimeSignalMessage: { // TimeSignalMessage
 * //         SegmentationDescriptors: [ // SegmentationDescriptorList
 * //           { // SegmentationDescriptor
 * //             SegmentationEventId: Number("int"),
 * //             SegmentationUpidType: Number("int"),
 * //             SegmentationUpid: "STRING_VALUE",
 * //             SegmentationTypeId: Number("int"),
 * //             SegmentNum: Number("int"),
 * //             SegmentsExpected: Number("int"),
 * //             SubSegmentNum: Number("int"),
 * //             SubSegmentsExpected: Number("int"),
 * //           },
 * //         ],
 * //       },
 * //       AdBreakMetadata: [ // AdBreakMetadataList
 * //         { // KeyValuePair
 * //           Key: "STRING_VALUE", // required
 * //           Value: "STRING_VALUE", // required
 * //         },
 * //       ],
 * //     },
 * //   ],
 * //   Arn: "STRING_VALUE",
 * //   ChannelName: "STRING_VALUE",
 * //   CreationTime: new Date("TIMESTAMP"),
 * //   LiveSourceName: "STRING_VALUE",
 * //   ProgramName: "STRING_VALUE",
 * //   ScheduledStartTime: new Date("TIMESTAMP"),
 * //   SourceLocationName: "STRING_VALUE",
 * //   VodSourceName: "STRING_VALUE",
 * //   ClipRange: { // ClipRange
 * //     EndOffsetMillis: Number("long"), // required
 * //   },
 * //   DurationMillis: Number("long"),
 * // };
 *
 * ```
 *
 * @param DescribeProgramCommandInput - {@link DescribeProgramCommandInput}
 * @returns {@link DescribeProgramCommandOutput}
 * @see {@link DescribeProgramCommandInput} for command's `input` shape.
 * @see {@link DescribeProgramCommandOutput} for command's `response` shape.
 * @see {@link MediaTailorClientResolvedConfig | config} for MediaTailorClient's `config` shape.
 *
 * @throws {@link MediaTailorServiceException}
 * <p>Base exception class for all service exceptions from MediaTailor service.</p>
 *
 */
export class DescribeProgramCommand extends $Command
  .classBuilder<
    DescribeProgramCommandInput,
    DescribeProgramCommandOutput,
    MediaTailorClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
  })
  .m(function (this: any, Command: any, cs: any, config: MediaTailorClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("MediaTailor", "DescribeProgram", {})
  .n("MediaTailorClient", "DescribeProgramCommand")
  .f(void 0, void 0)
  .ser(se_DescribeProgramCommand)
  .de(de_DescribeProgramCommand)
  .build() {}
