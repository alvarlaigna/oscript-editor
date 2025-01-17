import * as monaco from 'monaco-editor'

export default [
	{
		quoted: true,
		label: 'autonomous agent',
		insertText: 'autonomous agent',
		kind: monaco.languages.CompletionItemKind.Keyword,
		detail: `Autonomous agents definition`,
		documentation: {
			value:
`
Autonomous agent definition

Addresses of autonomous agents follow the same general rules as all other Obyte addresses: their definitions are two-element arrays and the address is a checksummed hash of the array encoded in base32.

AA address is defined as:

	["autonomous agent", {
		// here goes the AA code
	}]

The second element of the above array is an object that defines a template for future units created by the AA.  The template's structure follows the structure of a regular unit in general, with some elements dynamic and dependent upon the input and state parameters.  The dynamic elements are designated with special markup and include code in a domain specific language called Oscript:

	{address: "{trigger.address}", amount: "{trigger.output[[asset=base]] - 1000}"}
`
		}
	},
	{
		quoted: false,
		label: 'bounce_fees',
		insertText: 'bounce_fees: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`bounce_fees` field',
		documentation: {
			value:
`
This is an optional field of the unit template that specifies the fees charged from sender if the AA execution fails.  In this case, all the received money in all assets is automatically bounced back to sender, less the bounce fees.  The fees are keyed by asset ID ('base' for bytes).

The minimum and default bounce fee for bytes is 10000 bytes.  The minimum and default bounce fee for all other assets is 0.  Non-base bounce fees apply only to those assets that were actually received by the autonomous agent.

Sending to an autonomous agent anything less than the bounce fees will result in no response and the AA silently eating the coins.  However this rule applies only to money sent from regular addresses.  Bounce fees are not checked when the money is received from another AA.

'bounce_fees' field is removed from the final unit.

	{
		bounce_fees: { base: 10000, "n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY=": 100 },
		...
	}
`
		}
	},
	{
		quoted: false,
		label: 'messages',
		insertText: 'messages: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`messages` field',
		documentation: {
			value:
`
This is the main field of autonomous agent definition.  It specifies templates for the messages to be generated, and the templates are parameterized with oscript code.

The messages can be of any type (called \`app\`) that Obyte supports.  The most common app is \`payment\`, it is used to send payments in any asset back to sender or to a third party.  Other apps are:
* \`asset\`: used to define a new asset;
* \`data\`: used to send data, this includes sending data parameters to other (secondary) AAs;
* \`data_feed\`: used to send data feeds.  By doing this, the AA becomes an oracle;
* \`profile\`: used to send one's own profile.  Maybe an AA wants to say something to the world about itself;
* \`text\`: used to save arbitrary text to the DAG;
* \`definition\`: used to post a definition of a new AA;
* \`asset_attestors\`: used to change the attestor list of an asset previously defined by this AA;
* \`attestation\`: used to post information about some other address.  By doing this, the AA becomes an attestor;
* \`definition_template\`: used to post a template for smart contract definition;
* \`poll\`: used to create a poll;
* \`vote\`: used to vote in a poll.  Every AA has voting rights after all.

There is also another, special, app called \`state\`, which is not possible in regular units but is used only in AAs to produce state changes.  More about it in a [separate chapter]().
`
		}
	},
	{
		quoted: false,
		label: 'app',
		insertText: 'app: ',
		kind: monaco.languages.CompletionItemKind.Field,
		documentation: {
			value:
`
In Obyte, any transaction can contain one or more _messages_ of different types. These types are called _apps_.  The most common app is \`payment\`.  At least one payment is mandatory in every transaction, it is necessary to at least pay fees.  Another app is \`data\`.
`
		},
		detail: '`app` field'
	},
	{
		quoted: false,
		label: 'payload',
		insertText: 'payload: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`payload` field',
		documentation: {
			value:
`
The object in \`payload\` is the data this message delivers.
`
		}
	},
	{
		quoted: false,
		label: 'outputs',
		insertText: 'outputs: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`outputs` field',
		documentation: {
			value:
`
Outputs of the response transaction
`
		}
	},
	{
		quoted: false,
		label: 'address',
		insertText: 'address: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`address` field',
		documentation: {
			value:
`
Output address
`
		}
	},
	{
		quoted: false,
		label: 'amount',
		insertText: 'amount: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`amount` field',
		documentation: {
			value:
`
Output amount
`
		}
	},
	{
		quoted: false,
		label: 'cases',
		insertText: 'cases: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`cases` field',
		documentation: {
			value:
`
The regular value of an object/array is replaced with an object whose single element is an array \`cases\`.  Each element of the \`cases\` array is an object with up to 3 elements:
* \`if\`: an Oscript expression.  If the result of its evaluation is truthy then this \`case\` is selected.  All other \`case\`s are not evaluated.  \`if\` is required for all \`case\`s except the last, the last one may or may not have an \`if\`.  If all previous \`case\`s evaluated to a falsy value and the last one is without an \`if\`, the last one is selected;
* \`init\`: an optional statements-only Oscript that is evaluated immediately after \`if\` if this \`case\` is selected;
* a mandatory element that is named the same as the original field (\`messages\` in the above example).  If this \`case\` is selected, the original (3 levels higher) field is replaced with the value of this element.
Cases can be nested.

Cases can be used for any non-scalar value inside \`messages\`, not just \`messages\` themselves.
`
		}
	},
	{
		quoted: false,
		label: 'if',
		insertText: 'if: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`if` field',
		documentation: {
			value:
`
Any object can have an additional \`if\` field.  It is evaluated first, and if it is falsy, the entire object is removed from the enclosing object or array.  Its internal Oscripts are not evaluated in this case.
The \`if\` field itself is removed from the object.
`
		}
	},
	{
		quoted: false,
		label: 'init',
		insertText: 'init: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`init` field',
		documentation: {
			value:
`
Any object can have an additional \`init\` field.  It is evaluated immediately after \`if\` if \`if\` is present and truthy.  If there is no \`if\`, \`init\` is unconditionally evaluated first.

	{
		messages: [
			{
				init: \`{ $addr = trigger.address; }\`,
				app: 'data',
				payload: {
					timestamp: \`{timestamp}\`,
					subscriber: \`{$addr}\`
				}
			},
			{
				if: \`{trigger.data.withdrawal_amount > 1000}\`,
				init: \`{ $amount = trigger.data.withdrawal_amount - 1000; }\`,
				app: 'payment',
				payload: {
					asset: "base",
					outputs: [
						{address: "{trigger.address}", amount: "{$amount}"}
					]
				}
			}
		]
	}

\`init\` must be a statements-only Oscript, it does not return a value.
The \`init\` field itself is removed from the object.
`
		}
	},
	{
		quoted: false,
		label: 'state',
		insertText: 'state ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`state` field',
		documentation: {
			value:
`
A state message is a special message in the \`messages\` array that performs state changes.  It is the only oscript where [state variables](#State variables) are assigned.  Unlike regular messages that always have \`payload\`, state message has a field named \`state\` instead that contains a state changing script:

	{
		messages: [
			{
				app: 'payment',
				payload: {
					asset: 'base',
					outputs: [
						{address: "{trigger.address}", amount: "{trigger.output[[asset=base]] - 1000}"}
					]
				}
			},
			{
				app: 'state',
				state: \`{
					var['responded'] = 1;
					var['total_balance_sent_back'] += trigger.output[[asset=base]] - 1000;
					var[trigger.address || '_response_unit'] = response_unit;
				}\`
			}
		]
	}

The state message must always be the last message in the \`messages\` array.  It is not included in the final response unit and its script (state script) is evaluated **after** the response unit is already prepared.  It is the only oscript where [response_unit](#response_unit) variable is available. State script contains only statements, it is not allowed to return any value.
`
		}
	},
	{
		quoted: false,
		label: 'base',
		insertText: 'base: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`base` field',
		documentation: {
			value:
`
`
		}
	},
	{
		quoted: false,
		label: 'is_transferrable',
		insertText: 'is_transferrable: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`is_transferrable` field',
		documentation: {
			value:
`
\`is_transferrable\`: boolean, is the asset transferrable?
`
		}
	},
	{
		quoted: false,
		label: 'cap',
		insertText: 'cap: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`cap` field',
		documentation: {
			value:
`
\`cap\`: number, total supply of the asset.  For uncapped assets, 0 is returned;
`
		}
	},
	{
		quoted: false,
		label: 'is_private',
		insertText: 'is_private: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`is_private` field',
		documentation: {
			value:
`
\`is_private\`: boolean, is the asset private?
`
		}
	},
	{
		quoted: false,
		label: 'auto_destroy',
		insertText: 'auto_destroy: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`auto_destroy` field',
		documentation: {
			value:
`
\`auto_destroy\`: boolean, does the asset gets autodestroyed when sent to definer address?
`
		}
	},
	{
		quoted: false,
		label: 'fixed_denominations',
		insertText: 'fixed_denominations: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`fixed_denominations` field',
		documentation: {
			value:
`
\`fixed_denominations\`: boolean,is the asset issued in fixed denominations?
`
		}
	},
	{
		quoted: false,
		label: 'issued_by_definer_only',
		insertText: 'issued_by_definer_only: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`issued_by_definer_only` field',
		documentation: {
			value:
`
\`issued_by_definer_only\`: boolean, is the asset issued by definer only?
`
		}
	},
	{
		quoted: false,
		label: 'cosigned_by_definer',
		insertText: 'cosigned_by_definer: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`cosigned_by_definer` field',
		documentation: {
			value:
`
\`cosigned_by_definer\`: boolean, should each transfer be cosigned by definer?
`
		}
	},
	{
		quoted: false,
		label: 'spender_attested',
		insertText: 'spender_attested: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`spender_attested` field',
		documentation: {
			value:
`
\`spender_attested\`: boolean, should each holder be attested?
`
		}
	},
	{
		quoted: false,
		label: 'is_issued',
		insertText: 'is_issued: ',
		kind: monaco.languages.CompletionItemKind.Field,
		detail: '`is_issued` field',
		documentation: {
			value:
`
\`is_issued\`: boolean, is any amount of the asset already issued?
`
		}
	}
]
