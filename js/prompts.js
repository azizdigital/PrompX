/**
 * PromptForge OIM - Prompts Database
 * Complete data for all 41 prompts (CORRECTED VERSION)
 */

const PromptsData = {
    categories: [
        {
            id: 'oim-ops',
            name: 'OIM Operations',
            icon: '🏭',
            color: '#3B82F6',
            description: 'Offshore operations management prompts'
        },
        {
            id: 'refining',
            name: 'Report Refining',
            icon: '📝',
            color: '#06B6D4',
            description: 'Polish and refine communications'
        },
        {
            id: 'language',
            name: 'Language & Translation',
            icon: '🌐',
            color: '#8B5CF6',
            description: 'Translation and language tools'
        },
        {
            id: 'personal',
            name: 'Personal Development',
            icon: '👔',
            color: '#10B981',
            description: 'Career and professional growth'
        },
        {
            id: 'general',
            name: 'General Purpose',
            icon: '⚙️',
            color: '#F59E0B',
            description: 'Versatile productivity tools'
        }
    ],

    prompts: [
        // ═══════════════════════════════════════════════════════════
        // OIM OPERATIONS (18 PROMPTS)
        // ═══════════════════════════════════════════════════════════
        
        {
            id: 'reply-boss-wa',
            category: 'oim-ops',
            type: 'ai-only',
            title: 'Reply Boss WhatsApp',
            icon: '💬',
            description: 'Quick professional WhatsApp replies to management',
            inputs: [
                {
                    name: 'bossMessage',
                    label: 'Boss Message',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste boss WhatsApp message here...',
                    rows: 4
                },
                {
                    name: 'yourResponse',
                    label: 'Your Intended Response',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What you want to say...',
                    rows: 4
                },
                {
                    name: 'tone',
                    label: 'Tone',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'professional', label: 'Professional', default: true },
                        { value: 'friendly', label: 'Friendly' },
                        { value: 'urgent', label: 'Urgent' }
                    ]
                }
            ],
            aiPrompt: `Act as an experienced Offshore Installation Manager. My boss sent this WhatsApp message:

"{bossMessage}"

I want to reply with:
"{yourResponse}"

Please refine this into a {tone} WhatsApp reply that is:
- Clear and concise
- Appropriate for management communication
- Professional yet approachable
- Action-oriented if needed

Keep it brief (2-5 lines max for WhatsApp).`
        },

        {
            id: 'process-upset',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Process Upset Report',
            icon: '⚠️',
            description: 'Document process upsets and recovery actions',
            inputs: [
                {
                    name: 'platform',
                    label: 'Platform',
                    type: 'select',
                    required: true,
                    options: ['IbA', 'IbB', 'IbC']
                },
                {
                    name: 'equipmentAffected',
                    label: 'Equipment/System Affected',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Compressor K-101, Separator V-201'
                },
                {
                    name: 'datetime',
                    label: 'Date/Time',
                    type: 'datetime-local',
                    required: true
                },
                {
                    name: 'upsetDescription',
                    label: 'Upset Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Describe what happened...',
                    rows: 5
                },
                {
                    name: 'rootCause',
                    label: 'Root Cause',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Suspected or confirmed root cause...',
                    rows: 3
                },
                {
                    name: 'productionImpact',
                    label: 'Impact on Production',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 2 kbd loss, No impact, etc.'
                },
                {
                    name: 'immediateActions',
                    label: 'Immediate Actions Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Actions taken immediately...',
                    rows: 5
                },
                {
                    name: 'recoveryPlan',
                    label: 'Recovery Plan',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Steps to recover normal operations...',
                    rows: 4
                },
                {
                    name: 'downtime',
                    label: 'Estimated Downtime',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 4 hours, Ongoing, etc.'
                },
                {
                    name: 'supportNeeded',
                    label: 'Support Needed',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Any support required from onshore/vendors...',
                    rows: 3
                }
            ],
            template: `PROCESS UPSET REPORT
═══════════════════════════════

PLATFORM: {platform}
DATE/TIME: {datetime}
REPORTED BY: {reporter} (OIM)

EQUIPMENT/SYSTEM AFFECTED
─────────────────────────
{equipmentAffected}

UPSET DESCRIPTION
─────────────────────────
{upsetDescription}

ROOT CAUSE
─────────────────────────
{rootCause}

PRODUCTION IMPACT
─────────────────────────
{productionImpact}

IMMEDIATE ACTIONS TAKEN
─────────────────────────
{immediateActions}

RECOVERY PLAN
─────────────────────────
{recoveryPlan}

ESTIMATED DOWNTIME: {downtime}

SUPPORT REQUIRED
─────────────────────────
{supportNeeded}

═══════════════════════════════
Report Generated: {timestamp}
═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Act as an Offshore Installation Manager. Refine this process upset report to professional English with clear technical communication. Maintain structure and all factual details:

---
{template}
---

Ensure:
- Professional technical English
- Clear cause-and-effect relationships
- Actionable recovery plan
- Management-ready format
- Maintain original structure`
                },
                {
                    id: 'power',
                    name: 'Power OIM',
                    icon: '💎',
                    prompt: `Act as a senior Offshore Installation Manager. Transform this process upset report to executive-level professional English with strong OIM authority:

---
{template}
---

Transform to achieve:
- Executive-level technical communication
- Assertive OIM leadership tone
- Clear business impact emphasis
- Management escalation ready
- Maintain all factual details`
                }
            ]
        },

        {
            id: 'safety-incident',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Safety Incident Report',
            icon: '🚨',
            description: 'Formal safety incident documentation (PETRONAS standard)',
            inputs: [
                {
                    name: 'platform',
                    label: 'Platform',
                    type: 'select',
                    required: true,
                    options: ['IbA', 'IbB', 'IbC']
                },
                {
                    name: 'date',
                    label: 'Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'incidentType',
                    label: 'Incident Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Near Miss',
                        'First Aid Case',
                        'Medical Treatment Case',
                        'Lost Time Injury',
                        'Equipment Damage',
                        'Environmental Incident'
                    ]
                },
                {
                    name: 'severity',
                    label: 'Severity',
                    type: 'select',
                    required: true,
                    options: ['Low', 'Medium', 'High', 'Critical']
                },
                {
                    name: 'personnelInvolved',
                    label: 'Personnel Involved (Name, Position, Company - separate with semicolon)',
                    type: 'textarea',
                    required: true,
                    placeholder: 'e.g., Ahmad Hassan; Technician; PETRONAS Carigali',
                    rows: 3
                },
                {
                    name: 'incidentDescription',
                    label: 'Incident Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Detailed description of what happened...',
                    rows: 6
                },
                {
                    name: 'immediateActions',
                    label: 'Immediate Actions Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'List all immediate actions taken...',
                    rows: 5
                },
                {
                    name: 'potentialConsequences',
                    label: 'Potential Consequences (If not prevented)',
                    type: 'textarea',
                    required: false,
                    placeholder: 'What could have happened...',
                    rows: 3
                },
                {
                    name: 'photos',
                    label: 'Photos/Evidence',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Attached', label: 'Attached' },
                        { value: 'Not Applicable', label: 'Not Applicable' }
                    ]
                }
            ],
            template: `SAFETY INCIDENT REPORT
═══════════════════════════════

PLATFORM: {platform}
DATE: {date}
TIME: {time} HRS
REPORT BY: {reporter} (OIM)

INCIDENT CLASSIFICATION
─────────────────────────
Type: {incidentType}
Severity: {severity}

PERSONNEL INVOLVED
─────────────────────────
{personnelInvolved}

INCIDENT DESCRIPTION
─────────────────────────
{incidentDescription}

IMMEDIATE ACTIONS TAKEN
─────────────────────────
{immediateActions}

{if potentialConsequences}
POTENTIAL CONSEQUENCES
─────────────────────────
{potentialConsequences}
{endif}

EVIDENCE: {photos}

═══════════════════════════════
REPORTED TO: [Management name]
REPORT TIME: {timestamp}
═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this safety incident report to professional English:

---
{template}
---

Maintain all facts, structure, and details while improving:
- Language quality and clarity
- Professional terminology
- Consistent formatting`
                },
                {
                    id: 'power',
                    name: 'Power OIM',
                    icon: '💎',
                    prompt: `Act as a senior Offshore Installation Manager. Transform this safety incident report to executive-level professional English with strong safety leadership tone:

---
{template}
---

Refine to achieve:
- Executive-level English with technical accuracy
- Assertive safety leadership tone
- Emphasize preventive actions and control
- Add technical terminology where appropriate
- Management-ready format for immediate escalation
- Maintain all factual details and structure`
                }
            ]
        },

        {
            id: 'toolbox-talk',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Toolbox Talk Script',
            icon: '🗣️',
            description: 'Create safety talk content for crew briefings',
            inputs: [
                {
                    name: 'topic',
                    label: 'Topic',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Confined Space Entry, Hot Work Safety'
                },
                {
                    name: 'duration',
                    label: 'Duration',
                    type: 'select',
                    required: true,
                    options: ['5 minutes', '10 minutes', '15 minutes']
                },
                {
                    name: 'targetAudience',
                    label: 'Target Audience',
                    type: 'select',
                    required: true,
                    options: [
                        'All Personnel',
                        'Operations Team',
                        'Maintenance Team',
                        'Contractors',
                        'Specific Group'
                    ]
                },
                {
                    name: 'keyPoints',
                    label: 'Key Points to Cover',
                    type: 'textarea',
                    required: true,
                    placeholder: 'List main points (bullet format okay)...',
                    rows: 6
                },
                {
                    name: 'recentIncident',
                    label: 'Recent Incident/Learning (if any)',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Reference any recent incidents or lessons learned...',
                    rows: 3
                },
                {
                    name: 'practicalDemo',
                    label: 'Practical Demo Required?',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No', default: true }
                    ]
                }
            ],
            template: `TOOLBOX TALK
═══════════════════════════════

TOPIC: {topic}
DATE: {date}
DURATION: {duration}
AUDIENCE: {targetAudience}
PRESENTER: {reporter} (OIM)

OBJECTIVES
─────────────────────────
[Auto-generate based on topic]

KEY SAFETY POINTS
─────────────────────────
{keyPoints}

{if recentIncident}
LESSONS LEARNED / RECENT INCIDENT
─────────────────────────
{recentIncident}
{endif}

DISCUSSION POINTS
─────────────────────────
1. What are the main hazards?
2. What controls are in place?
3. What should you do if...?
4. Questions from the crew?

{if practicalDemo === "Yes"}
PRACTICAL DEMONSTRATION
─────────────────────────
[Demonstrate proper procedures]
{endif}

CREW ACKNOWLEDGMENT
─────────────────────────
All personnel confirm understanding: ________

═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this toolbox talk to professional English:

---
{template}
---

Keep it engaging and easy to understand while improving:
- Language clarity
- Safety messaging
- Practical examples`
                },
                {
                    id: 'engaging',
                    name: 'Engaging Style',
                    icon: '🎯',
                    prompt: `Act as an experienced offshore safety leader. Transform this toolbox talk into an engaging, memorable safety presentation:

---
{template}
---

Enhance to:
- Use relatable examples and scenarios
- Add interactive questions
- Include "what would you do if..." scenarios
- Make technical points easy to understand
- Add emphasis on personal responsibility
- Keep professional but conversational tone
- Ensure it fits within {duration} timeframe`
                }
            ]
        },

        {
            id: 'handover-notes',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Handover Notes (Key Highlights)',
            icon: '🔄',
            description: 'Key highlights for shift handover (not full report)',
            inputs: [
                {
                    name: 'outgoingOIM',
                    label: 'Outgoing OIM Name',
                    type: 'text',
                    required: true,
                    placeholder: 'Auto-filled from settings'
                },
                {
                    name: 'incomingOIM',
                    label: 'Incoming OIM Name',
                    type: 'text',
                    required: true,
                    placeholder: 'Name of incoming OIM'
                },
                {
                    name: 'criticalOps',
                    label: 'Critical Ongoing Operations',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Wells status, maintenance activities, etc...',
                    rows: 4
                },
                {
                    name: 'safetyDefeats',
                    label: 'Active Safety Defeats/Bypasses',
                    type: 'textarea',
                    required: false,
                    placeholder: 'List any temporary defeats with TD numbers...',
                    rows: 3
                },
                {
                    name: 'personnelMatters',
                    label: 'Personnel Matters',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Any personnel issues, crew changes, etc...',
                    rows: 2
                },
                {
                    name: 'pendingApprovals',
                    label: 'Pending Approvals/Decisions',
                    type: 'textarea',
                    required: false,
                    placeholder: 'What needs boss approval, pending decisions...',
                    rows: 3
                },
                {
                    name: 'recommendations',
                    label: 'Recommendations for Incoming OIM',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Priority actions, things to watch...',
                    rows: 4
                }
            ],
            template: `SHIFT HANDOVER - KEY HIGHLIGHTS
═══════════════════════════════

Assalamualaikum {incomingOIM}, Welcome back to IbA. 
Wishing you a safe and smooth hitch ahead with continued operational excellence.

🔧 CRITICAL ONGOING OPERATIONS
─────────────────────────
{criticalOps}

{if safetyDefeats}
⚠️ ACTIVE SAFETY DEFEATS/BYPASSES
─────────────────────────
{safetyDefeats}
{endif}

{if personnelMatters}
👥 PERSONNEL MATTERS
─────────────────────────
{personnelMatters}
{endif}

{if pendingApprovals}
📋 PENDING APPROVALS/DECISIONS
─────────────────────────
{pendingApprovals}
{endif}

💡 RECOMMENDATIONS
─────────────────────────
{recommendations}

═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this handover note to professional English:

---
{template}
---

Maintain structure and all operational details while improving:
- Professional language
- Clarity of critical information
- Proper formatting`
                },
                {
                    id: 'executive',
                    name: 'Executive Summary',
                    icon: '📊',
                    prompt: `Convert this handover note to concise executive bullet points:

---
{template}
---

Transform to:
- Bullet-point format
- Focus on critical items only
- Executive-level summary
- Key priorities highlighted`
                }
            ]
        },

        {
            id: 'equipment-issue',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Equipment Issue Report',
            icon: '🔧',
            description: 'Quick equipment issue notification (casual style)',
            inputs: [
                {
                    name: 'equipmentTag',
                    label: 'Equipment Name/Tag',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., K-101, P-301'
                },
                {
                    name: 'problemDescription',
                    label: 'Problem Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Apa problem...',
                    rows: 4
                },
                {
                    name: 'currentStatus',
                    label: 'Current Status',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Running (ada issue)', label: 'Running (ada issue)' },
                        { value: 'Shutdown', label: 'Shutdown' },
                        { value: 'Isolated', label: 'Isolated' }
                    ]
                },
                {
                    name: 'impact',
                    label: 'Impact',
                    type: 'text',
                    required: true,
                    placeholder: 'Production impact...'
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Apa dah buat...',
                    rows: 3
                },
                {
                    name: 'nextStep',
                    label: 'Next Step',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Plan forward...',
                    rows: 3
                }
            ],
            template: `Equipment Issue - {equipmentTag}

Platform: IbA
Date: {date} {time}

Problem:
{problemDescription}

Current Status: {currentStatus}
Impact: {impact}

Action Taken:
{actionTaken}

Next Step:
{nextStep}

Reported by: {reporter}`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this equipment issue report to professional English:

---
{template}
---

Clean up and improve:
- Professional language
- Concise but complete
- Clear action items`
                },
                {
                    id: 'power',
                    name: 'Power OIM',
                    icon: '💎',
                    prompt: `Transform this equipment issue to formal escalation format:

---
{template}
---

Elevate for management:
- Executive-level language
- Clear business impact
- Urgent action required
- Management-ready format`
                }
            ]
        },

        {
            id: 'personnel-issue',
            category: 'oim-ops',
            type: 'ai-only',
            title: 'Personnel Issue Handling',
            icon: '👥',
            description: 'Handle personnel matters professionally',
            inputs: [
                {
                    name: 'issueType',
                    label: 'Issue Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Performance concern',
                        'Behavioral issue',
                        'Conflict between crew',
                        'Violation of rules',
                        'Medical/fitness concern',
                        'Request/complaint',
                        'Disciplinary matter'
                    ]
                },
                {
                    name: 'personDetails',
                    label: 'Person Details',
                    type: 'text',
                    required: true,
                    placeholder: 'Name, position, company'
                },
                {
                    name: 'situation',
                    label: 'Situation',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Apa yang jadi...',
                    rows: 5
                },
                {
                    name: 'whatYouWant',
                    label: 'What You Want',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Outcome yang awak nak...',
                    rows: 3
                },
                {
                    name: 'whoToConsult',
                    label: 'Who to Consult',
                    type: 'checkbox',
                    options: [
                        { value: 'HR', label: 'HR' },
                        { value: 'Medical', label: 'Medical' },
                        { value: 'Supervisor', label: 'Supervisor' },
                        { value: 'Boss', label: 'Boss' },
                        { value: 'Just need template', label: 'Just need template' }
                    ]
                }
            ],
            aiPrompt: `Act as OIM handling personnel issue. Help me with this situation:

Issue: {issueType}
Person: {personDetails}

What happened:
{situation}

What I want to achieve:
{whatYouWant}

Need to involve: {whoToConsult}

Give me:
1. How to talk to this person (template)
2. What to document
3. Next steps
4. Who else to inform

Keep it professional but practical. OIM tone.`
        },

        {
            id: 'emergency-response',
            category: 'oim-ops',
            type: 'ai-only',
            title: 'Emergency Response Communication',
            icon: '🚨',
            description: 'Communicate during emergency situations',
            inputs: [
                {
                    name: 'emergencyType',
                    label: 'Emergency Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Fire',
                        'Gas leak',
                        'Oil spill',
                        'Medical emergency',
                        'Man overboard',
                        'Severe weather',
                        'Equipment failure (critical)',
                        'Evacuation',
                        'Security threat',
                        'Other'
                    ]
                },
                {
                    name: 'currentStatus',
                    label: 'Current Status',
                    type: 'select',
                    required: true,
                    options: [
                        'Ongoing',
                        'Contained',
                        'Under control',
                        'Resolved',
                        'Escalating'
                    ]
                },
                {
                    name: 'location',
                    label: 'Location/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'Specific location on platform'
                },
                {
                    name: 'timeStarted',
                    label: 'Time Started',
                    type: 'datetime-local',
                    required: true
                },
                {
                    name: 'personnelAffected',
                    label: 'Personnel Affected',
                    type: 'text',
                    required: true,
                    placeholder: 'Number affected, any injuries'
                },
                {
                    name: 'actionsTaken',
                    label: 'Actions Taken So Far',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Emergency response actions...',
                    rows: 5
                },
                {
                    name: 'currentSituation',
                    label: 'Current Situation',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Current status in detail...',
                    rows: 4
                },
                {
                    name: 'assistanceNeeded',
                    label: 'Assistance Needed',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What support is required?',
                    rows: 3
                },
                {
                    name: 'communicationTarget',
                    label: 'Communication Target',
                    type: 'checkbox',
                    required: true,
                    options: [
                        { value: 'Boss/Asset Manager', label: 'Boss/Asset Manager' },
                        { value: 'Emergency Response Team', label: 'Emergency Response Team' },
                        { value: 'PETRONAS Management', label: 'PETRONAS Management' },
                        { value: 'Regulatory authorities', label: 'Regulatory authorities' }
                    ]
                }
            ],
            aiPrompt: `URGENT - Emergency Response Communication

Act as Offshore Installation Manager responding to an emergency. Create a clear, factual emergency communication:

EMERGENCY TYPE: {emergencyType}
STATUS: {currentStatus}
LOCATION: {location}
TIME STARTED: {timeStarted}
PERSONNEL AFFECTED: {personnelAffected}

ACTIONS TAKEN:
{actionsTaken}

CURRENT SITUATION:
{currentSituation}

ASSISTANCE NEEDED:
{assistanceNeeded}

TARGET: {communicationTarget}

Generate a {communicationTarget}-appropriate emergency communication that:
- Starts with clear emergency classification
- States facts without speculation
- Uses urgent but controlled tone
- Specifies immediate actions taken
- Clearly states what help is needed
- Includes contact information for follow-up
- Is ready for immediate transmission

Format for: WhatsApp/SMS for immediate alert, followed by email format for formal record.`
        },

        {
            id: 'extend-td',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Extend Temporary Defeat',
            icon: '⏱️',
            description: 'Request extension for safety bypasses/temporary defeats',
            inputs: [
                {
                    name: 'tdNumber',
                    label: 'TD Number',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., TD-IbA-2024-015'
                },
                {
                    name: 'equipmentDescription',
                    label: 'Equipment/System Description',
                    type: 'text',
                    required: true,
                    placeholder: 'What is bypassed/defeated'
                },
                {
                    name: 'originalDate',
                    label: 'Original Approval Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'originalApprover',
                    label: 'Original Approver',
                    type: 'text',
                    required: true,
                    placeholder: 'Who originally approved'
                },
                {
                    name: 'extensionDays',
                    label: 'Requested Extension Period (days)',
                    type: 'number',
                    required: true,
                    placeholder: 'How many more days needed'
                },
                {
                    name: 'reasonExtension',
                    label: 'Reason for Extension',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Why extension is needed...',
                    rows: 4
                },
                {
                    name: 'safetyConcerns',
                    label: 'Safety Concerns/Risks',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Associated safety risks...',
                    rows: 4
                },
                {
                    name: 'safeguardsInPlace',
                    label: 'Safeguards in Place',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What controls are active...',
                    rows: 4
                },
                {
                    name: 'preventiveMeasures',
                    label: 'Preventive Measures',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Measures to prevent incidents...',
                    rows: 3
                },
                {
                    name: 'mitigativeMeasures',
                    label: 'Mitigative Measures',
                    type: 'textarea',
                    required: true,
                    placeholder: 'If something goes wrong...',
                    rows: 3
                },
                {
                    name: 'targetCompletionDate',
                    label: 'Target Completion Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'rootCauseDelay',
                    label: 'Root Cause of Delay',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Why couldn\'t complete in original timeframe...',
                    rows: 3
                }
            ],
            template: `TEMPORARY DEFEAT EXTENSION REQUEST
═══════════════════════════════

TD NUMBER: {tdNumber}
EQUIPMENT/SYSTEM: {equipmentDescription}
PLATFORM: IbA

CURRENT STATUS
─────────────────────────
Original Approval Date: {originalDate}
Original Approver: {originalApprover}
Requested Extension: {extensionDays} days

APPROVAL LEVEL: [Auto-calculated based on duration]

REASON FOR EXTENSION
─────────────────────────
{reasonExtension}

ROOT CAUSE OF DELAY
─────────────────────────
{rootCauseDelay}

SAFETY ASSESSMENT
─────────────────────────

Safety Concerns/Risks:
{safetyConcerns}

Safeguards in Place:
{safeguardsInPlace}

Preventive Measures:
{preventiveMeasures}

Mitigative Measures:
{mitigativeMeasures}

TARGET COMPLETION
─────────────────────────
Date: {targetCompletionDate}

═══════════════════════════════
Prepared by: {reporter} (OIM)
Date: {timestamp}
═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this TD extension request to professional English:

---
{template}
---

Maintain all safety details and improve:
- Professional language
- Clear justification
- Safety emphasis`
                },
                {
                    id: 'escalation',
                    name: 'Escalation Format',
                    icon: '📋',
                    prompt: `Act as a senior Offshore Installation Manager preparing a Temporary Defeat extension request for GM approval. Elevate this request to executive-level standard:

---
{template}
---

Transform to achieve:
- Executive summary at the top
- Strong emphasis on risk mitigation
- Clear business justification
- Demonstrate robust safety management
- Professional escalation tone
- Ready for GM review and decision
- Include cost/impact of alternatives if relevant`
                }
            ]
        },

        {
            id: 'audit-response',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Audit Findings Response',
            icon: '📑',
            description: 'Respond to audit findings with corrective actions',
            inputs: [
                {
                    name: 'auditType',
                    label: 'Audit Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Internal Safety Audit',
                        'External Regulatory Audit',
                        'Quality Audit',
                        'Environmental Audit',
                        'Process Safety Audit',
                        'Management System Audit'
                    ]
                },
                {
                    name: 'auditDate',
                    label: 'Audit Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'auditor',
                    label: 'Auditor/Agency',
                    type: 'text',
                    required: true
                },
                {
                    name: 'findingNumber',
                    label: 'Finding Number/Reference',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Finding #3.2'
                },
                {
                    name: 'findingCategory',
                    label: 'Finding Category',
                    type: 'select',
                    required: true,
                    options: [
                        'Critical',
                        'Major Non-Conformance',
                        'Minor Non-Conformance',
                        'Observation',
                        'Opportunity for Improvement'
                    ]
                },
                {
                    name: 'findingDescription',
                    label: 'Finding Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Copy the finding as stated by auditor...',
                    rows: 4
                },
                {
                    name: 'rootCause',
                    label: 'Root Cause Analysis',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Why did this happen...',
                    rows: 4
                },
                {
                    name: 'correctiveAction',
                    label: 'Corrective Action',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What will be done to fix...',
                    rows: 5
                },
                {
                    name: 'preventiveAction',
                    label: 'Preventive Action',
                    type: 'textarea',
                    required: true,
                    placeholder: 'How to prevent recurrence...',
                    rows: 4
                },
                {
                    name: 'responsiblePerson',
                    label: 'Responsible Person',
                    type: 'text',
                    required: true
                },
                {
                    name: 'targetDate',
                    label: 'Target Completion Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'resources',
                    label: 'Resources Required',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Budget, materials, support needed...',
                    rows: 2
                },
                {
                    name: 'evidenceClosure',
                    label: 'Evidence of Closure',
                    type: 'textarea',
                    required: true,
                    placeholder: 'How will completion be verified...',
                    rows: 2
                }
            ],
            template: `AUDIT FINDING RESPONSE
═══════════════════════════════

AUDIT DETAILS
─────────────────────────
Type: {auditType}
Date: {auditDate}
Auditor: {auditor}
Finding Ref: {findingNumber}
Category: {findingCategory}

FINDING DESCRIPTION
─────────────────────────
{findingDescription}

ROOT CAUSE ANALYSIS
─────────────────────────
{rootCause}

CORRECTIVE ACTION
─────────────────────────
{correctiveAction}

PREVENTIVE ACTION
─────────────────────────
{preventiveAction}

IMPLEMENTATION PLAN
─────────────────────────
Responsible: {responsiblePerson}
Target Date: {targetDate}
{if resources}Resources Required: {resources}{endif}

VERIFICATION OF CLOSURE
─────────────────────────
{evidenceClosure}

═══════════════════════════════
Response by: {reporter} (OIM)
Date: {timestamp}
Status: Open
═══════════════════════════════`,
            aiRefineOptions: [
                {
                    id: 'quick',
                    name: 'Quick Refine',
                    icon: '⚡',
                    prompt: `Refine this audit response to professional English:

---
{template}
---

Maintain structure and improve:
- Professional language
- Clear action items
- Proper audit response format`
                },
                {
                    id: 'comprehensive',
                    name: 'Comprehensive',
                    icon: '🎯',
                    prompt: `Expand this audit response to comprehensive detailed format:

---
{template}
---

Enhance to:
- Detailed root cause analysis
- Supporting rationale for each action
- Timeline justifications
- Resource requirements explained
- Risk assessment included
- Verification methodology detailed`
                }
            ]
        },

        {
            id: 'production-meeting',
            category: 'oim-ops',
            type: 'ai-only',
            title: 'Production Meeting Prep',
            icon: '📊',
            description: 'Prepare for production review meetings',
            inputs: [
                {
                    name: 'meetingDate',
                    label: 'Meeting Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'meetingType',
                    label: 'Meeting Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Daily Production Meeting',
                        'Weekly Production Review',
                        'Monthly Performance Review',
                        'Quarterly Business Review',
                        'Ad-hoc Production Discussion'
                    ]
                },
                {
                    name: 'keyTopics',
                    label: 'Key Topics',
                    type: 'checkbox',
                    options: [
                        { value: 'Production performance', label: 'Production performance' },
                        { value: 'Well performance', label: 'Well performance' },
                        { value: 'Equipment reliability', label: 'Equipment reliability' },
                        { value: 'Maintenance activities', label: 'Maintenance activities' },
                        { value: 'Safety performance', label: 'Safety performance' },
                        { value: 'Cost/budget', label: 'Cost/budget' },
                        { value: 'Projects/improvements', label: 'Projects/improvements' }
                    ]
                },
                {
                    name: 'productionData',
                    label: 'Current Production Data',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Recent production figures, trends...',
                    rows: 4
                },
                {
                    name: 'challenges',
                    label: 'Challenges/Issues to Discuss',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Problems, concerns, bottlenecks...',
                    rows: 5
                },
                {
                    name: 'questions',
                    label: 'Questions to Raise',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Questions for management...',
                    rows: 3
                },
                {
                    name: 'requests',
                    label: 'Requests/Approvals Needed',
                    type: 'textarea',
                    required: false,
                    placeholder: 'What you need from management...',
                    rows: 3
                },
                {
                    name: 'attendees',
                    label: 'Meeting Attendees',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Who will be in the meeting...',
                    rows: 2
                }
            ],
            aiPrompt: `Act as an Offshore Installation Manager preparing for a production meeting. Help me prepare a comprehensive meeting brief:

MEETING: {meetingType}
DATE: {meetingDate}
ATTENDEES: {attendees}

KEY TOPICS: {keyTopics}

CURRENT PRODUCTION DATA:
{productionData}

CHALLENGES/ISSUES:
{challenges}

{if questions}QUESTIONS TO RAISE: {questions}{endif}
{if requests}REQUESTS/APPROVALS: {requests}{endif}

Please provide:
1. Executive summary (2-3 lines) of current status
2. Key talking points for each topic (concise, data-backed)
3. Anticipated questions from management and suggested answers
4. Priority sequence for discussing items
5. Clear asks/action items for management
6. Backup data/facts I should have ready

Format as a meeting brief I can reference during discussion. Keep it concise and actionable.`
        },

        {
            id: 'budget-justification',
            category: 'oim-ops',
            type: 'ai-only',
            title: 'Budget Justification',
            icon: '💰',
            description: 'Justify expenses to boss',
            inputs: [
                {
                    name: 'whatYouNeed',
                    label: 'What You Need',
                    type: 'text',
                    required: true,
                    placeholder: 'Item/expense'
                },
                {
                    name: 'amount',
                    label: 'Amount',
                    type: 'text',
                    required: true,
                    placeholder: 'MYR/USD'
                },
                {
                    name: 'whyNeed',
                    label: 'Why You Need It',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Kenapa perlu...',
                    rows: 4
                },
                {
                    name: 'impactIfNot',
                    label: 'What Happens If Not Approved',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Impact kalau tak dapat...',
                    rows: 3
                },
                {
                    name: 'howUrgent',
                    label: 'How Urgent',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Urgent (safety/critical)', label: 'Urgent (safety/critical)' },
                        { value: 'Important (1-2 weeks)', label: 'Important (1-2 weeks)' },
                        { value: 'Can wait (1 month+)', label: 'Can wait (1 month+)' }
                    ]
                }
            ],
            aiPrompt: `Act as OIM requesting budget approval from boss.

Item: {whatYouNeed}
Cost: {amount}

Why needed:
{whyNeed}

If not approved:
{impactIfNot}

Urgency: {howUrgent}

Create email to boss that:
- Clear and direct
- Business case solid
- Shows I thought through
- Not too formal but professional
- Gets the point across
- Ready to send

Make it sound like OIM asking boss, not corporate memo.`
        },

        // ═══════════════════════════════════════════════════════════
        // TEMPLATE-ONLY PROMPTS (6 PROMPTS)
        // ═══════════════════════════════════════════════════════════

        {
            id: 'lopc-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'LOPC Report',
            icon: '🚨',
            description: 'Loss of Primary Containment report (WhatsApp format)',
            inputs: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Hydrocarbon leak at flange'
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'moduleArea',
                    label: 'Module/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Process Module, Wellbay'
                },
                {
                    name: 'description',
                    label: 'Brief Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Brief description of LOPC...',
                    rows: 3
                },
                {
                    name: 'pointOfLeak',
                    label: 'Point of Leak',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Flange connection at HP separator'
                },
                {
                    name: 'drawingRef',
                    label: 'Drawing Reference',
                    type: 'text',
                    required: false,
                    placeholder: 'Drawing number (optional)'
                },
                {
                    name: 'leakSize',
                    label: 'Leak Size',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Pin hole, 5mm crack'
                },
                {
                    name: 'operatingPressure',
                    label: 'Operating Pressure',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 50 barg'
                },
                {
                    name: 'medium',
                    label: 'Medium',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Crude oil, Gas, Condensate'
                },
                {
                    name: 'releaseDuration',
                    label: 'Release Duration',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 5 minutes, Immediate isolation'
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Immediate actions taken...',
                    rows: 4
                },
                {
                    name: 'wayForward',
                    label: 'Way Forward',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Next steps and permanent fix...',
                    rows: 3
                }
            ],
            template: `*LOPC REPORT*
Dear PMA IC,

*Title:* {title}
*Date:* {date} at {time}
*Platform:* Irong Barat A
*Module/Area:* {moduleArea}

*Brief Description:*
{description}

*LOPC Detail:*
*Point of Leak:* {pointOfLeak}
{if drawingRef}*Drawing Reference:* {drawingRef}{endif}
*Leak Size:* {leakSize}
*Operating Pressure:* {operatingPressure}
*Medium:* {medium}
*Release Duration:* {releaseDuration}

*Action Taken:*
{actionTaken}

*Way Forward:*
{wayForward}

Regards,
Aziz Mohamad - OIM Irong Barat A`,
            aiRefineOptions: [
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this LOPC report to professional English for PMA IC:

---
{template}
---

Improve:
- Professional technical language
- Clear and concise
- Proper LOPC terminology
- Maintain WhatsApp format`
                }
            ]
        },

        {
            id: 'emergency-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Emergency Report',
            icon: '🚨',
            description: 'Emergency situation report (WhatsApp format)',
            inputs: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Fire/Gas Leak/Medical Emergency'
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'moduleArea',
                    label: 'Module/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Living Quarter, Process Module'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What happened...',
                    rows: 4
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Emergency response actions...',
                    rows: 4
                },
                {
                    name: 'wayForward',
                    label: 'Way Forward',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Next steps and follow-up...',
                    rows: 3
                }
            ],
            template: `*EMERGENCY REPORT*
Dear PMA IC,

*Title:* {title}
*Date:* {date} at {time}
*Platform:* Irong Barat A
*Module/Area:* {moduleArea}

*Description:*
{description}

*Action Taken:*
{actionTaken}

*Way Forward:*
{wayForward}

Regards,
Aziz Mohamad - OIM Irong Barat A`,
            aiRefineOptions: [
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this emergency report to professional English:

---
{template}
---

Improve clarity, urgency, and professional language while maintaining WhatsApp format.`
                }
            ]
        },

        {
            id: 'medical-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Medical Report',
            icon: '🏥',
            description: 'Medical case report (WhatsApp format)',
            inputs: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Medical case - chest pain'
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'moduleArea',
                    label: 'Module/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Living Quarter, Drill Floor'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Medical case details...',
                    rows: 4
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Medical treatment and response...',
                    rows: 4
                },
                {
                    name: 'wayForward',
                    label: 'Way Forward',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Medevac, monitoring, follow-up...',
                    rows: 3
                }
            ],
            template: `*MEDICAL REPORT*
Dear PMA IC,

*Title:* {title}
*Date:* {date} at {time}
*Platform:* Irong Barat A
*Module/Area:* {moduleArea}

*Description:*
{description}

*Action Taken:*
{actionTaken}

*Way Forward:*
{wayForward}

Regards,
Aziz Mohamad - OIM Irong Barat A`,
            aiRefineOptions: [
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this medical report to professional English:

---
{template}
---

Improve medical terminology, clarity, and professional language while maintaining WhatsApp format.`
                }
            ]
        },

        {
            id: 'near-miss-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Near-Miss Report',
            icon: '⚠️',
            description: 'Near-miss incident report (WhatsApp format)',
            inputs: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Near-miss - dropped object'
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'moduleArea',
                    label: 'Module/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Drill Floor, Crane area'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What nearly happened...',
                    rows: 4
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Immediate corrective actions...',
                    rows: 4
                },
                {
                    name: 'wayForward',
                    label: 'Way Forward',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Preventive measures...',
                    rows: 3
                }
            ],
            template: `*NEAR-MISS REPORT*
Dear PMA IC,

*Title:* {title}
*Date:* {date} at {time}
*Platform:* Irong Barat A
*Module/Area:* {moduleArea}

*Description:*
{description}

*Action Taken:*
{actionTaken}

*Way Forward:*
{wayForward}

Regards,
Aziz Mohamad - OIM Irong Barat A`,
            aiRefineOptions: [
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this near-miss report to professional English:

---
{template}
---

Improve clarity, emphasize learning points, and maintain professional WhatsApp format.`
                }
            ]
        },

        {
            id: 'incident-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Incident Report',
            icon: '🔴',
            description: 'Incident report (WhatsApp format)',
            inputs: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Equipment damage incident'
                },
                {
                    name: 'time',
                    label: 'Time',
                    type: 'time',
                    required: true
                },
                {
                    name: 'moduleArea',
                    label: 'Module/Area',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., Process Module, Utilities'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Incident details...',
                    rows: 4
                },
                {
                    name: 'actionTaken',
                    label: 'Action Taken',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Response and containment actions...',
                    rows: 4
                },
                {
                    name: 'wayForward',
                    label: 'Way Forward',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Investigation and corrective actions...',
                    rows: 3
                }
            ],
            template: `*INCIDENT REPORT*
Dear PMA IC,

*Title:* {title}
*Date:* {date} at {time}
*Platform:* Irong Barat A
*Module/Area:* {moduleArea}

*Description:*
{description}

*Action Taken:*
{actionTaken}

*Way Forward:*
{wayForward}

Regards,
Aziz Mohamad - OIM Irong Barat A`,
            aiRefineOptions: [
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this incident report to professional English:

---
{template}
---

Improve clarity, factual accuracy, and professional language while maintaining WhatsApp format.`
                }
            ]
        },

        {
            id: 'daily-report',
            category: 'oim-ops',
            type: 'hybrid',
            title: 'Daily Operations Report',
            icon: '📊',
            description: 'Daily operations summary',
            inputs: [
                {
                    name: 'reportDate',
                    label: 'Operation Date',
                    type: 'date',
                    required: true
                },
                {
                    name: 'pob',
                    label: 'POB (Personnel on Board)',
                    type: 'number',
                    required: true,
                    placeholder: '0'
                },
                {
                    name: 'safetySummary',
                    label: 'SHE Summary',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Safety highlights, Near Miss, Incidents, UAUC counts...',
                    rows: 3
                },
                {
                    name: 'weather',
                    label: 'Weather',
                    type: 'text',
                    required: false,
                    placeholder: 'Fair, Rough, etc.'
                },
                {
                    name: 'swell',
                    label: 'Swell',
                    type: 'text',
                    required: false,
                    placeholder: '0m'
                },
                {
                    name: 'wind',
                    label: 'Wind',
                    type: 'text',
                    required: false,
                    placeholder: '0 knots'
                },
                {
                    name: 'crudeOil',
                    label: 'Crude Oil (kbd)',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 12.5 kbd'
                },
                {
                    name: 'crudeTarget',
                    label: 'Crude Oil Target (kbd)',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 13.0 kbd'
                },
                {
                    name: 'gasInjection',
                    label: 'Gas Injection (mmscf/d)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 2.5 mmscf/d'
                },
                {
                    name: 'gasTarget',
                    label: 'Gas Target (mmscf/d)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 3.0 mmscf/d'
                },
                {
                    name: 'flare',
                    label: 'Flare (mmscf/d)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 0.1 mmscf/d'
                },
                {
                    name: 'flareTarget',
                    label: 'Flare Target (mmscf/d)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 0.2 mmscf/d'
                },
                {
                    name: 'watercut',
                    label: 'Watercut (%)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., 45%'
                },
                {
                    name: 'operationsHighlight',
                    label: 'Operations Highlight',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Key operational points, well status, equipment status...',
                    rows: 6
                },
                {
                    name: 'keyChallenge',
                    label: 'Key Challenge',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Main challenges faced today...',
                    rows: 3
                },
                {
                    name: 'briefSummary',
                    label: 'Brief Summary',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Overall day summary (optional - can use AI to generate from above info)',
                    rows: 3
                }
            ],
            template: `Assalamualaikum FM Azri & All

*IbA Operation Date:* {reportDate}
*POB:* {pob} pax ✅

*SHE*
{safetySummary}

*Weather & Marine*
- Weather: {weather} | Swell: {swell} | Wind: {wind}

*Production Performance*
• Crude Oil: {crudeOil} vs {crudeTarget} (Target) {if crudeOil >= crudeTarget}✅{endif}
{if gasInjection}• Gas Injection: {gasInjection} vs {gasTarget} {if gasInjection >= gasTarget}✅{endif}{endif}
{if flare}• Flare: {flare} vs {flareTarget} {if flare <= flareTarget}✅{endif}{endif}
{if watercut}• Watercut: {watercut}{endif}

*Operations Highlight*
{operationsHighlight}

*Key Challenge*
{keyChallenge}

{if briefSummary}*Brief Summary*
{briefSummary}{endif}

_Aziz Mohamad - OIM Irong Barat_`,
            aiRefineOptions: [
                {
                    id: 'generate-summary',
                    name: 'Generate Brief Summary',
                    icon: '🤖',
                    prompt: `Based on this daily operations report, generate a concise Brief Summary section:

---
{template}
---

Create a 2-3 line executive summary that captures:
- Overall operational status
- Key achievements or challenges
- Production performance vs target
Keep it professional and suitable for senior management.`
                },
                {
                    id: 'polish',
                    name: 'Polish & Refine',
                    icon: '✨',
                    prompt: `Refine this daily operations report to professional English:

---
{template}
---

Improve clarity, professional language, and ensure proper WhatsApp formatting while maintaining all data.`
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════
        // REPORT REFINING & COMMUNICATION (10 PROMPTS)
        // ═══════════════════════════════════════════════════════════

        {
            id: 'refine-production-report',
            category: 'refining',
            type: 'ai-only',
            title: 'Refine Daily Production Report',
            icon: '📈',
            description: 'Polish daily production reports for management',
            inputs: [
                {
                    name: 'originalReport',
                    label: 'Original Report Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste your rojak/draft report here...',
                    rows: 10
                },
                {
                    name: 'targetAudience',
                    label: 'Target Audience',
                    type: 'select',
                    required: true,
                    options: [
                        'Boss/Asset Manager',
                        'Senior Management/GM',
                        'Operations Team',
                        'Technical Team'
                    ]
                },
                {
                    name: 'focusArea',
                    label: 'Focus Area',
                    type: 'checkbox',
                    options: [
                        { value: 'Production figures', label: 'Production figures' },
                        { value: 'Equipment status', label: 'Equipment status' },
                        { value: 'Safety matters', label: 'Safety matters' },
                        { value: 'Maintenance activities', label: 'Maintenance activities' },
                        { value: 'All of above', label: 'All of above', default: true }
                    ]
                },
                {
                    name: 'desiredLength',
                    label: 'Desired Length',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Keep original length', label: 'Keep original length', default: true },
                        { value: 'Shorter (executive summary)', label: 'Shorter (executive summary)' },
                        { value: 'More detailed', label: 'More detailed' }
                    ]
                }
            ],
            aiPrompt: `Act as an Offshore Installation Manager. Refine this daily production report for {targetAudience}:

---
{originalReport}
---

Focus on: {focusArea}
Desired length: {desiredLength}

Transform this to:
- Professional English (clean up rojak/casual language)
- Clear structure and flow
- Highlight key information
- OIM authoritative tone
- Executive-friendly format (if Boss/GM)
- Maintain all factual data
- Remove redundancy
- Professional terminology

Keep the essential information, improve the presentation.`
        },

        {
            id: 'refine-engineering',
            category: 'refining',
            type: 'ai-only',
            title: 'Refine Engineering/Machinery Update',
            icon: '⚙️',
            description: 'Polish technical updates for different audiences',
            inputs: [
                {
                    name: 'originalText',
                    label: 'Original Technical Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste technical description...',
                    rows: 8
                },
                {
                    name: 'targetReader',
                    label: 'Target Reader',
                    type: 'select',
                    required: true,
                    options: [
                        'Management (non-technical)',
                        'Technical team (engineers)',
                        'Mixed audience',
                        'Regulatory/audit'
                    ]
                },
                {
                    name: 'technicalLevel',
                    label: 'Technical Level to Maintain',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'High (keep all technical details)', label: 'High (keep all technical details)' },
                        { value: 'Medium (balance technical & accessible)', label: 'Medium (balance technical & accessible)', default: true },
                        { value: 'Low (simplify for non-technical readers)', label: 'Low (simplify for non-technical readers)' }
                    ]
                },
                {
                    name: 'purpose',
                    label: 'Purpose',
                    type: 'select',
                    options: [
                        'Status update',
                        'Problem explanation',
                        'Recommendation/proposal',
                        'Incident report'
                    ]
                }
            ],
            aiPrompt: `Act as an OIM with strong technical background. Refine this engineering/machinery update:

---
{originalText}
---

Target reader: {targetReader}
Technical level: {technicalLevel}
Purpose: {purpose}

Refine to achieve:
- Professional technical English
- Appropriate technical depth for audience
- Translate technical jargon to clear business impact (if Management)
- Maintain technical accuracy and detail (if Technical)
- Clear problem-solution structure
- OIM confidence and authority
- Remove casual language
- Keep it factual and objective`
        },

        {
            id: 'shorten-text',
            category: 'refining',
            type: 'ai-only',
            title: 'Shorten Technical Text (Keep It Solid)',
            icon: '📉',
            description: 'Condense text while maintaining substance',
            inputs: [
                {
                    name: 'originalText',
                    label: 'Original Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste long text here...',
                    rows: 10
                },
                {
                    name: 'targetLength',
                    label: 'Target Length',
                    type: 'select',
                    required: true,
                    options: [
                        '50% of original',
                        '30% of original (executive summary)',
                        '2-3 lines only',
                        'Specific word count (enter below)'
                    ]
                },
                {
                    name: 'specificWordCount',
                    label: 'Specific Word Count (if selected)',
                    type: 'number',
                    required: false,
                    placeholder: 'e.g., 100'
                },
                {
                    name: 'mustKeepPoints',
                    label: 'Must-Keep Points',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Key points that MUST remain...',
                    rows: 3
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'text',
                    required: false,
                    placeholder: 'Where will this be used? (WhatsApp, email, report)'
                }
            ],
            aiPrompt: `Act as an expert editor for offshore operations. Shorten this text while keeping it substantial and impactful:

---
{originalText}
---

Target: {targetLength}
{if mustKeepPoints}MUST INCLUDE: {mustKeepPoints}{endif}
{if context}Context: {context}{endif}

Shorten by:
- Removing redundancy
- Combining related points
- Using stronger, more concise words
- Eliminating filler phrases
- Keeping technical accuracy
- Maintaining professional tone
- Preserving key facts and data

The shortened version should still be "solid" - authoritative, clear, and complete despite being brief.`
        },

        {
            id: 'make-assertive',
            category: 'refining',
            type: 'ai-only',
            title: 'Make Text More Assertive (But Gentle)',
            icon: '💪',
            description: 'Strengthen language while staying diplomatic',
            inputs: [
                {
                    name: 'originalText',
                    label: 'Original Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste text that needs more confidence...',
                    rows: 6
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'select',
                    required: true,
                    options: [
                        'Recommendation to management',
                        'Declining a request',
                        'Stating requirements',
                        'Setting expectations',
                        'Defending a position',
                        'General communication'
                    ]
                },
                {
                    name: 'assertivenessLevel',
                    label: 'Level of Assertiveness',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Slightly more confident', label: 'Slightly more confident' },
                        { value: 'Moderately assertive', label: 'Moderately assertive', default: true },
                        { value: 'Strongly assertive (but still professional)', label: 'Strongly assertive (but still professional)' }
                    ]
                }
            ],
            aiPrompt: `Act as an OIM coach. Transform this text to be more assertive while maintaining professionalism:

---
{originalText}
---

Context: {context}
Target assertiveness: {assertivenessLevel}

Strengthen by:
- Removing tentative language ("maybe", "possibly", "I think")
- Using confident statements instead of questions
- Active voice instead of passive
- Clear "we will" instead of "we might"
- Remove excessive qualifiers
- Direct language while staying respectful
- Maintain diplomatic tone
- Show leadership confidence

The result should be firm but not aggressive, confident but not arrogant.`
        },

        {
            id: 'remove-repetitive',
            category: 'refining',
            type: 'ai-only',
            title: 'Remove Repetitive Statements',
            icon: '🔄',
            description: 'Clean up redundant content in reports',
            inputs: [
                {
                    name: 'originalText',
                    label: 'Original Report/Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste report with repetitive content...',
                    rows: 10
                },
                {
                    name: 'keyMessages',
                    label: 'Keep Key Messages',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What are the essential points to retain...',
                    rows: 3
                },
                {
                    name: 'outputStyle',
                    label: 'Output Style',
                    type: 'radio',
                    options: [
                        { value: 'Consolidated paragraphs', label: 'Consolidated paragraphs', default: true },
                        { value: 'Bullet points', label: 'Bullet points' },
                        { value: 'Mixed (paragraphs + bullets)', label: 'Mixed (paragraphs + bullets)' }
                    ]
                }
            ],
            aiPrompt: `Act as an editor for offshore operations reports. Remove repetitive statements while preserving all key information:

---
{originalText}
---

Key messages to retain: {keyMessages}
Output style: {outputStyle}

Clean up by:
- Identifying duplicate information
- Merging similar points
- Keeping only one instance of each fact
- Maintaining logical flow
- Preserving all unique information
- Professional formatting
- Clear structure

Ensure nothing important is lost, just eliminate redundancy.`
        },

        {
            id: 'format-whatsapp',
            category: 'refining',
            type: 'ai-only',
            title: 'Format for WhatsApp Message',
            icon: '📱',
            description: 'Convert reports/emails to WhatsApp-friendly format',
            inputs: [
                {
                    name: 'originalContent',
                    label: 'Original Content',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste full report/email...',
                    rows: 10
                },
                {
                    name: 'targetRecipient',
                    label: 'Target Recipient',
                    type: 'select',
                    required: true,
                    options: [
                        'Boss (one-on-one)',
                        'Management group',
                        'Operations team group',
                        'Mixed audience group'
                    ]
                },
                {
                    name: 'keyPoints',
                    label: 'Key Points Only',
                    type: 'textarea',
                    required: false,
                    placeholder: 'If certain points are most important, list here...',
                    rows: 3
                },
                {
                    name: 'includeEmojis',
                    label: 'Include Emojis?',
                    type: 'radio',
                    options: [
                        { value: 'Yes (professional emojis only)', label: 'Yes (professional emojis only)', default: true },
                        { value: 'No', label: 'No' }
                    ]
                }
            ],
            aiPrompt: `Act as an OIM. Convert this content to WhatsApp message format:

---
{originalContent}
---

Recipient: {targetRecipient}
{if keyPoints}Focus on: {keyPoints}{endif}
Emojis: {includeEmojis}

Format for WhatsApp:
- Very concise (WhatsApp is brief medium)
- Use line breaks for readability
- Bullet points with symbols (•, -, →)
- Use relevant professional emojis (✅, ⚠️, 📊, etc.) if enabled
- Highlight key numbers/dates
- Clear sections if multiple topics
- End with clear action/status
- Keep professional despite casual medium
- Maximum 2-3 short paragraphs OR bullet list

The result should be complete but WhatsApp-appropriate in length and style.`
        },

        {
            id: 'management-friendly',
            category: 'refining',
            type: 'ai-only',
            title: 'Make Management-Friendly',
            icon: '👔',
            description: 'Translate technical content for management consumption',
            inputs: [
                {
                    name: 'technicalText',
                    label: 'Technical Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste technical content...',
                    rows: 8
                },
                {
                    name: 'managementLevel',
                    label: 'Management Level',
                    type: 'select',
                    required: true,
                    options: [
                        'Asset Manager (some technical background)',
                        'Senior Management/GM (limited technical)',
                        'Executive/Board (business focus)'
                    ]
                },
                {
                    name: 'simplificationLevel',
                    label: 'Simplification Level',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Light (keep some technical terms)', label: 'Light (keep some technical terms)' },
                        { value: 'Moderate (explain technical concepts)', label: 'Moderate (explain technical concepts)', default: true },
                        { value: 'Heavy (pure business language)', label: 'Heavy (pure business language)' }
                    ]
                },
                {
                    name: 'focus',
                    label: 'Focus',
                    type: 'checkbox',
                    options: [
                        { value: 'Business impact', label: 'Business impact', default: true },
                        { value: 'Safety implications', label: 'Safety implications' },
                        { value: 'Cost implications', label: 'Cost implications' },
                        { value: 'Timeline/schedule', label: 'Timeline/schedule' },
                        { value: 'Risk factors', label: 'Risk factors' }
                    ]
                }
            ],
            aiPrompt: `Act as an OIM translating technical information for management. Make this management-friendly:

---
{technicalText}
---

Management level: {managementLevel}
Simplification: {simplificationLevel}
Focus on: {focus}

Transform by:
- Converting technical jargon to plain English
- Explaining "what" and "why" not just "how"
- Emphasizing business impact
- Using analogies if helpful
- Highlighting risks and opportunities
- Clear recommendation or status
- Executive summary style
- Keep confidence and authority

Management should understand the situation and implications without needing technical expertise.`
        },

        {
            id: 'soften-harsh',
            category: 'refining',
            type: 'ai-only',
            title: 'Soften Harsh Language',
            icon: '🧊',
            description: 'Make strong statements more diplomatic',
            inputs: [
                {
                    name: 'originalText',
                    label: 'Original Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste text that might be too harsh...',
                    rows: 6
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'select',
                    required: true,
                    options: [
                        'Criticism or feedback',
                        'Declining a request',
                        'Disagreement with decision',
                        'Complaint or concern',
                        'Correcting someone',
                        'General communication'
                    ]
                },
                {
                    name: 'desiredTone',
                    label: 'Desired Tone',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Diplomatic (still firm)', label: 'Diplomatic (still firm)', default: true },
                        { value: 'Collaborative (team approach)', label: 'Collaborative (team approach)' },
                        { value: 'Gentle (very soft)', label: 'Gentle (very soft)' }
                    ]
                }
            ],
            aiPrompt: `Act as an OIM skilled in professional communication. Soften this text while maintaining the message:

---
{originalText}
---

Context: {context}
Desired tone: {desiredTone}

Soften by:
- Using more diplomatic phrasing
- Adding collaborative language ("we", "together")
- Cushioning direct statements
- Positive framing where possible
- Acknowledging others' perspectives
- "I understand..." or "I appreciate..." openings
- Constructive instead of critical
- Professional courtesy maintained

The message and position should remain clear, just delivered more gently.`
        },

        {
            id: 'bombastic-writer',
            category: 'refining',
            type: 'ai-only',
            title: 'Corporate Bombastic Writer',
            icon: '💎',
            description: 'Elevate simple statements to corporate formal language',
            inputs: [
                {
                    name: 'simpleStatement',
                    label: 'Simple Statement',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Enter simple/casual statement...',
                    rows: 4
                },
                {
                    name: 'formalityLevel',
                    label: 'Formality Level',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Professional (standard business)', label: 'Professional (standard business)' },
                        { value: 'Formal (executive level)', label: 'Formal (executive level)', default: true },
                        { value: 'Very Formal (board/regulatory)', label: 'Very Formal (board/regulatory)' }
                    ]
                },
                {
                    name: 'jargonPreference',
                    label: 'Industry Jargon Preference',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Oil & Gas specific', label: 'Oil & Gas specific', default: true },
                        { value: 'General corporate', label: 'General corporate' },
                        { value: 'Minimal jargon (clear but formal)', label: 'Minimal jargon (clear but formal)' }
                    ]
                },
                {
                    name: 'purpose',
                    label: 'Purpose',
                    type: 'select',
                    options: [
                        'Presentation/pitch',
                        'Executive report',
                        'Formal correspondence',
                        'Policy/procedure',
                        'General upgrade'
                    ]
                }
            ],
            aiPrompt: `Act as a corporate communications expert in oil & gas. Transform this simple statement into corporate formal language:

---
{simpleStatement}
---

Formality: {formalityLevel}
Jargon: {jargonPreference}
Purpose: {purpose}

Elevate by:
- Using sophisticated vocabulary
- Industry-appropriate terminology
- Formal sentence structure
- Professional passive voice where appropriate
- Corporate buzzwords (strategically)
- Measured, authoritative tone
- Executive-level language
- Maintain clarity despite formality

Make it sound impressive while staying meaningful and clear.`
        },

        {
            id: 'damage-control',
            category: 'refining',
            type: 'ai-only',
            title: 'Damage Control Communication',
            icon: '🛡️',
            description: 'Handle sensitive situations professionally',
            inputs: [
                {
                    name: 'situationDescription',
                    label: 'Situation Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What happened that needs damage control...',
                    rows: 5
                },
                {
                    name: 'communicationTarget',
                    label: 'Communication Target',
                    type: 'select',
                    required: true,
                    options: [
                        'Boss/Management',
                        'Client/Stakeholder',
                        'Team/Crew',
                        'Regulatory/External',
                        'Multiple audiences'
                    ]
                },
                {
                    name: 'yourRole',
                    label: 'Your Role/Responsibility',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What\'s your position in this situation...',
                    rows: 2
                },
                {
                    name: 'correctiveActions',
                    label: 'Corrective Actions Taken/Planned',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What you\'re doing to fix it...',
                    rows: 4
                },
                {
                    name: 'communicationObjective',
                    label: 'Communication Objective',
                    type: 'checkbox',
                    options: [
                        { value: 'Take ownership', label: 'Take ownership' },
                        { value: 'Provide assurance', label: 'Provide assurance' },
                        { value: 'Prevent escalation', label: 'Prevent escalation' },
                        { value: 'Maintain trust', label: 'Maintain trust' },
                        { value: 'Show control of situation', label: 'Show control of situation' }
                    ]
                }
            ],
            aiPrompt: `Act as a crisis communication advisor for offshore operations. Help craft damage control communication:

SITUATION:
{situationDescription}

TARGET: {communicationTarget}
YOUR ROLE: {yourRole}

CORRECTIVE ACTIONS:
{correctiveActions}

OBJECTIVES: {communicationObjective}

Create communication that:
- Acknowledges the issue appropriately (no hiding)
- Takes ownership without over-apologizing
- Focuses on solutions not problems
- Demonstrates control and competence
- Provides assurance and confidence
- Clear on corrective actions
- Professional and calm tone
- Forward-looking
- Maintains trust and credibility

Provide both: (1) immediate response and (2) follow-up communication template`
        },

        // ═══════════════════════════════════════════════════════════
        // LANGUAGE & TRANSLATION (5 PROMPTS)
        // ═══════════════════════════════════════════════════════════

        {
            id: 'technical-bm-to-en',
            category: 'language',
            type: 'ai-only',
            title: 'Technical BM → Professional English',
            icon: '🌐',
            description: 'Translate technical Bahasa Malaysia to professional English',
            inputs: [
                {
                    name: 'bmText',
                    label: 'BM Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste Bahasa Malaysia text...',
                    rows: 8
                },
                {
                    name: 'technicalLevel',
                    label: 'Technical Level',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Highly technical (engineering terms)', label: 'Highly technical (engineering terms)' },
                        { value: 'Moderately technical', label: 'Moderately technical', default: true },
                        { value: 'General operations', label: 'General operations' }
                    ]
                },
                {
                    name: 'formality',
                    label: 'Formality',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Casual (team communication)', label: 'Casual (team communication)' },
                        { value: 'Professional (standard business)', label: 'Professional (standard business)', default: true },
                        { value: 'Formal (management/external)', label: 'Formal (management/external)' }
                    ]
                },
                {
                    name: 'targetAudience',
                    label: 'Target Audience',
                    type: 'text',
                    required: false,
                    placeholder: 'Who will read this?'
                }
            ],
            aiPrompt: `Act as a bilingual Offshore Installation Manager. Translate this technical BM to professional English:

---
{bmText}
---

Technical level: {technicalLevel}
Formality: {formality}
{if targetAudience}Audience: {targetAudience}{endif}

Translate ensuring:
- Accurate technical terminology in English
- Appropriate formality level
- Natural English flow (not word-for-word)
- Industry-standard terms
- Professional tone
- Cultural context adjusted for international audience
- Keep technical accuracy

The English version should read as if originally written in English by a professional.`
        },

        {
            id: 'rojak-to-english',
            category: 'language',
            type: 'ai-only',
            title: 'Rojak → Clean English',
            icon: '🔄',
            description: 'Convert mixed BM/English to professional English',
            inputs: [
                {
                    name: 'rojakText',
                    label: 'Mixed Language Text',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste rojak text (BM + English mix)...',
                    rows: 8
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'select',
                    required: true,
                    options: [
                        'Technical report',
                        'Email/correspondence',
                        'Meeting notes',
                        'WhatsApp converted to email',
                        'Incident description',
                        'Other'
                    ]
                },
                {
                    name: 'audience',
                    label: 'Audience',
                    type: 'select',
                    required: true,
                    options: [
                        'Local team (can be less formal)',
                        'Management (professional)',
                        'International audience (very clear)',
                        'Mixed'
                    ]
                }
            ],
            aiPrompt: `Act as an OIM. Convert this rojak (mixed BM/English) text to clean professional English:

---
{rojakText}
---

Context: {context}
Audience: {audience}

Transform by:
- Translating all BM to English
- Standardizing terminology
- Removing code-switching
- Professional English throughout
- Maintaining original meaning
- Clear and formal
- Extra clarity for non-Malaysian readers (if International)
- Industry-appropriate language

Result should be clean English suitable for {audience}.`
        },

        {
            id: 'two-line-power',
            category: 'language',
            type: 'ai-only',
            title: 'Two-Line Power Statement',
            icon: '⚡',
            description: 'Compress message into 2 powerful lines',
            inputs: [
                {
                    name: 'fullMessage',
                    label: 'Full Message',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste full message/explanation...',
                    rows: 6
                },
                {
                    name: 'keyPoint',
                    label: 'Key Point',
                    type: 'text',
                    required: true,
                    placeholder: 'What\'s the main point?'
                },
                {
                    name: 'impactLevel',
                    label: 'Impact Level',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'High impact (urgent/critical)', label: 'High impact (urgent/critical)' },
                        { value: 'Moderate impact (important)', label: 'Moderate impact (important)', default: true },
                        { value: 'Informational', label: 'Informational' }
                    ]
                },
                {
                    name: 'usage',
                    label: 'Usage',
                    type: 'select',
                    options: [
                        'WhatsApp to boss',
                        'SMS alert',
                        'Email subject + preview',
                        'Slack/Teams message',
                        'Executive summary opening'
                    ]
                }
            ],
            aiPrompt: `Act as a master of concise communication. Compress this to exactly 2 lines maximum:

---
Full message:
{fullMessage}

Key point: {keyPoint}
---

Impact: {impactLevel}
Usage: {usage}

Create 2-line version that:
- Captures the essence completely
- Uses powerful, precise words
- Conveys urgency appropriately (if High impact)
- Professional and clear
- Stands alone (complete thought)
- Appropriate tone for {usage}
- Maximum 2 lines (can be 1 if possible)

Every word must count. No filler.`
        },

        {
            id: 'politically-correct',
            category: 'language',
            type: 'ai-only',
            title: 'Politically Correct Rephraser',
            icon: '🤝',
            description: 'Rephrase sensitive statements appropriately',
            inputs: [
                {
                    name: 'originalStatement',
                    label: 'Original Statement',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste statement that might be sensitive...',
                    rows: 5
                },
                {
                    name: 'sensitiveAreas',
                    label: 'Sensitive Areas',
                    type: 'checkbox',
                    options: [
                        { value: 'Personnel/individual references', label: 'Personnel/individual references' },
                        { value: 'Cultural/ethnic context', label: 'Cultural/ethnic context' },
                        { value: 'Blame/fault attribution', label: 'Blame/fault attribution' },
                        { value: 'Company/vendor criticism', label: 'Company/vendor criticism' },
                        { value: 'Safety/incident discussion', label: 'Safety/incident discussion' },
                        { value: 'Performance issues', label: 'Performance issues' }
                    ]
                },
                {
                    name: 'alternativeTone',
                    label: 'Alternative Tone',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Neutral/objective', label: 'Neutral/objective', default: true },
                        { value: 'Constructive', label: 'Constructive' },
                        { value: 'Diplomatic', label: 'Diplomatic' },
                        { value: 'Very careful', label: 'Very careful' }
                    ]
                }
            ],
            aiPrompt: `Act as a professional communications advisor. Rephrase this statement to be politically correct:

---
{originalStatement}
---

Sensitive areas: {sensitiveAreas}
Desired tone: {alternativeTone}

Rephrase ensuring:
- Remove any potentially offensive language
- Neutral, objective phrasing
- Focus on issues not people
- Constructive framing
- Respectful tone
- Professional standards
- Keep the core message
- Diplomatic approach

The message should be clear but appropriate for all audiences.`
        },

        {
            id: 'language-translator',
            category: 'language',
            type: 'ai-only',
            title: 'Language Translator (BM ↔ EN)',
            icon: '🔄',
            description: 'Bidirectional translation with context',
            inputs: [
                {
                    name: 'textToTranslate',
                    label: 'Text to Translate',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste text here...',
                    rows: 8
                },
                {
                    name: 'sourceLanguage',
                    label: 'Source Language',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Bahasa Malaysia', label: 'Bahasa Malaysia', default: true },
                        { value: 'English', label: 'English' }
                    ]
                },
                {
                    name: 'targetLanguage',
                    label: 'Target Language',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'English', label: 'English', default: true },
                        { value: 'Bahasa Malaysia', label: 'Bahasa Malaysia' }
                    ]
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'select',
                    required: true,
                    options: [
                        'Technical/Engineering',
                        'Safety/Operations',
                        'Business/Management',
                        'Casual/Informal',
                        'Formal/Official'
                    ]
                },
                {
                    name: 'formalityLevel',
                    label: 'Formality Level',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Casual', label: 'Casual' },
                        { value: 'Professional', label: 'Professional', default: true },
                        { value: 'Formal', label: 'Formal' }
                    ]
                }
            ],
            aiPrompt: `Act as a professional translator with O&G background. Translate this:

---
{textToTranslate}
---

From: {sourceLanguage}
To: {targetLanguage}
Context: {context}
Formality: {formalityLevel}

Translate ensuring:
- Accurate meaning preserved
- Natural flow in target language
- Correct technical terminology (if Technical context)
- Appropriate formality level
- Cultural context adapted
- Not literal/word-for-word
- Reads naturally to native speaker
- Professional quality

Provide clean translation only (no notes unless clarification needed).`
        },

		// ═══════════════════════════════════════════════════════════
        // PERSONAL & PROFESSIONAL DEVELOPMENT (4 PROMPTS)
        // ═══════════════════════════════════════════════════════════

        {
            id: 'training-proposal',
            category: 'personal',
            type: 'ai-only',
            title: 'Course/Training Proposal',
            icon: '📚',
            description: 'Justify training requests to management',
            inputs: [
                {
                    name: 'courseName',
                    label: 'Course Name',
                    type: 'text',
                    required: true
                },
                {
                    name: 'trainingProvider',
                    label: 'Training Provider',
                    type: 'text',
                    required: true
                },
                {
                    name: 'duration',
                    label: 'Duration',
                    type: 'text',
                    required: true,
                    placeholder: 'e.g., 3 days, 2 weeks, etc.'
                },
                {
                    name: 'cost',
                    label: 'Cost',
                    type: 'text',
                    required: true,
                    placeholder: 'Total cost including travel if applicable'
                },
                {
                    name: 'courseObjectives',
                    label: 'Course Objectives/Content',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What will be learned...',
                    rows: 4
                },
                {
                    name: 'benefitsToCompany',
                    label: 'Benefits to Company',
                    type: 'textarea',
                    required: true,
                    placeholder: 'How this helps PETRONAS/operations...',
                    rows: 5
                },
                {
                    name: 'applicationToRole',
                    label: 'Application to Current Role',
                    type: 'textarea',
                    required: true,
                    placeholder: 'How you\'ll apply this knowledge...',
                    rows: 4
                },
                {
                    name: 'timeline',
                    label: 'Timeline/Dates',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Proposed dates, impact on operations...',
                    rows: 2
                },
                {
                    name: 'alternatives',
                    label: 'Alternatives Considered',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Other training options evaluated...',
                    rows: 2
                }
            ],
            aiPrompt: `Act as an OIM preparing a training proposal for management approval.

COURSE: {courseName}
PROVIDER: {trainingProvider}
DURATION: {duration}
COST: {cost}

COURSE CONTENT:
{courseObjectives}

BENEFITS TO COMPANY:
{benefitsToCompany}

APPLICATION TO ROLE:
{applicationToRole}

TIMELINE: {timeline}

{if alternatives}ALTERNATIVES CONSIDERED: {alternatives}{endif}

Create a compelling training proposal that:
- Opens with clear value proposition
- Links to business needs
- Shows ROI (return on investment)
- Demonstrates relevance to operations
- Addresses cost-benefit
- Shows due diligence
- Professional business case format
- Ready for approval
- Confident but not entitled tone

Format as formal request to Asset Manager/HR.`
        },

        {
            id: 'cover-letter',
            category: 'personal',
            type: 'ai-only',
            title: 'Job Application Cover Letter',
            icon: '💼',
            description: 'Create compelling cover letters for applications',
            inputs: [
                {
                    name: 'companyName',
                    label: 'Company Name',
                    type: 'text',
                    required: true
                },
                {
                    name: 'positionTitle',
                    label: 'Position Title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'howFound',
                    label: 'How You Found This Role',
                    type: 'text',
                    required: false,
                    placeholder: 'LinkedIn, referral, company website, etc.'
                },
                {
                    name: 'keyQualifications',
                    label: 'Your Key Qualifications',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Relevant experience, skills, achievements...',
                    rows: 6
                },
                {
                    name: 'whyInterested',
                    label: 'Why You\'re Interested',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Why this company/role interests you...',
                    rows: 4
                },
                {
                    name: 'whatIBring',
                    label: 'What You Bring',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Your unique value proposition...',
                    rows: 4
                },
                {
                    name: 'tonePreference',
                    label: 'Tone Preference',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Confident and experienced', label: 'Confident and experienced', default: true },
                        { value: 'Enthusiastic and eager', label: 'Enthusiastic and eager' },
                        { value: 'Balanced professional', label: 'Balanced professional' }
                    ]
                }
            ],
            aiPrompt: `Act as a career coach for offshore professionals. Create a compelling cover letter:

COMPANY: {companyName}
POSITION: {positionTitle}
{if howFound}Source: {howFound}{endif}

MY QUALIFICATIONS:
{keyQualifications}

WHY I'M INTERESTED:
{whyInterested}

WHAT I BRING:
{whatIBring}

Tone: {tonePreference}

Create cover letter that:
- Strong opening that grabs attention
- Demonstrates research about company
- Highlights relevant offshore experience
- Shows cultural fit
- Specific examples and achievements
- Clear value proposition
- Professional yet personal
- Confident without arrogance
- Natural enthusiasm
- Strong closing with call to action
- Appropriate length (not too long)

Format as ready-to-send cover letter.`
        },

        {
            id: 'swot-analysis',
            category: 'personal',
            type: 'ai-only',
            title: 'Personal SWOT Analysis',
            icon: '🎯',
            description: 'Structured self-assessment for career planning',
            inputs: [
                {
                    name: 'currentSituation',
                    label: 'Current Situation',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Your current role, responsibilities...',
                    rows: 3
                },
                {
                    name: 'careerGoal',
                    label: 'Career Goal',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Where you want to be in 3-5 years...',
                    rows: 3
                },
                {
                    name: 'strengths',
                    label: 'Your Strengths',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What you\'re good at, achievements...',
                    rows: 4
                },
                {
                    name: 'weaknesses',
                    label: 'Your Weaknesses',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Areas for improvement...',
                    rows: 4
                },
                {
                    name: 'opportunities',
                    label: 'Opportunities',
                    type: 'textarea',
                    required: true,
                    placeholder: 'External opportunities you see...',
                    rows: 4
                },
                {
                    name: 'threats',
                    label: 'Threats/Challenges',
                    type: 'textarea',
                    required: true,
                    placeholder: 'External challenges/obstacles...',
                    rows: 4
                },
                {
                    name: 'focusArea',
                    label: 'Focus Area',
                    type: 'select',
                    options: [
                        'Overall career development',
                        'Specific role preparation',
                        'Performance improvement',
                        'Career transition'
                    ]
                }
            ],
            aiPrompt: `Act as a career development coach for offshore professionals. Analyze this SWOT:

CURRENT SITUATION: {currentSituation}
CAREER GOAL: {careerGoal}

STRENGTHS:
{strengths}

WEAKNESSES:
{weaknesses}

OPPORTUNITIES:
{opportunities}

THREATS:
{threats}

Focus: {focusArea}

Provide analysis that:
- Validates and organizes SWOT inputs
- Identifies key leverage points (strength + opportunity)
- Highlights critical gaps (weakness + threat)
- Suggests actionable strategies for each quadrant
- Creates prioritized development plan
- Links to career goal
- Realistic and honest assessment
- Motivational but practical
- Specific next steps

Format as: (1) SWOT summary, (2) Key insights, (3) Action plan`
        },

        {
            id: 'leadership-reflection',
            category: 'personal',
            type: 'ai-only',
            title: 'Leadership Reflection',
            icon: '🌟',
            description: 'Reflect on leadership situations for growth',
            inputs: [
                {
                    name: 'leadershipSituation',
                    label: 'Recent Leadership Situation',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Describe a recent leadership challenge or situation...',
                    rows: 6
                },
                {
                    name: 'myActions',
                    label: 'Your Actions/Decisions',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What you did, decisions you made...',
                    rows: 5
                },
                {
                    name: 'whatWentWell',
                    label: 'What Went Well',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Positive outcomes, good decisions...',
                    rows: 4
                },
                {
                    name: 'whatCouldImprove',
                    label: 'What Could Improve',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What could have been better...',
                    rows: 4
                },
                {
                    name: 'lessonLearned',
                    label: 'Lesson Learned',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Your initial thoughts on lessons...',
                    rows: 3
                },
                {
                    name: 'reflectionGoal',
                    label: 'Reflection Goal',
                    type: 'select',
                    options: [
                        'General leadership growth',
                        'Specific skill development',
                        'Preparation for similar situations',
                        'Team management improvement',
                        'Decision-making enhancement'
                    ]
                }
            ],
            aiPrompt: `Act as a leadership development coach for offshore leaders. Guide reflection on this situation:

SITUATION:
{leadershipSituation}

MY ACTIONS:
{myActions}

WHAT WENT WELL:
{whatWentWell}

WHAT COULD IMPROVE:
{whatCouldImprove}

{if lessonLearned}MY THOUGHTS: {lessonLearned}{endif}

Goal: {reflectionGoal}

Provide reflection framework with:
- Objective analysis of the situation
- Recognition of effective leadership elements
- Constructive improvement areas
- Deeper lessons (beyond surface level)
- Alternative approaches to consider
- Transferable principles for future
- Questions for deeper self-reflection
- Action items for growth
- Affirmation of leadership progress

Tone should be supportive, honest, and developmental.`
        },

        // ═══════════════════════════════════════════════════════════
        // GENERAL PURPOSE (4 PROMPTS)
        // ═══════════════════════════════════════════════════════════

        {
            id: 'meeting-minutes',
            category: 'general',
            type: 'ai-only',
            title: 'Meeting Minutes Formatter',
            icon: '📝',
            description: 'Format meeting notes into professional minutes',
            inputs: [
                {
                    name: 'meetingTitle',
                    label: 'Meeting Title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'datetime',
                    label: 'Date & Time',
                    type: 'datetime-local',
                    required: true
                },
                {
                    name: 'attendees',
                    label: 'Attendees',
                    type: 'textarea',
                    required: true,
                    placeholder: 'List all attendees (one per line or comma-separated)...',
                    rows: 3
                },
                {
                    name: 'discussionPoints',
                    label: 'Raw Discussion Points/Notes',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Paste your rough notes from the meeting...',
                    rows: 10
                },
                {
                    name: 'actionItems',
                    label: 'Action Items (if identified)',
                    type: 'textarea',
                    required: false,
                    placeholder: 'List action items if you noted them...',
                    rows: 5
                },
                {
                    name: 'formatStyle',
                    label: 'Format Style',
                    type: 'radio',
                    required: true,
                    options: [
                        { value: 'Formal (detailed minutes)', label: 'Formal (detailed minutes)' },
                        { value: 'Standard (professional summary)', label: 'Standard (professional summary)', default: true },
                        { value: 'Brief (action-focused)', label: 'Brief (action-focused)' }
                    ]
                }
            ],
            aiPrompt: `Act as a professional minute-taker. Format these meeting notes into professional minutes:

MEETING: {meetingTitle}
DATE/TIME: {datetime}
ATTENDEES: {attendees}

RAW NOTES:
{discussionPoints}

{if actionItems}ACTION ITEMS NOTED: {actionItems}{endif}

Format style: {formatStyle}

Create meeting minutes with:
- Professional header
- Clear sections (Discussions, Decisions, Action Items)
- Organized by topic/agenda
- Third-person perspective
- Remove redundancy from notes
- Capture key points and decisions
- Clear action items with owners and deadlines
- Professional language
- Detailed discussion documentation (if Formal)
- Focus on outcomes and actions (if Brief)
- Ready for distribution

Format as standard business meeting minutes.`
        },

        {
            id: 'presentation-outline',
            category: 'general',
            type: 'ai-only',
            title: 'Presentation Outline',
            icon: '📊',
            description: 'Create presentation structure and talking points',
            inputs: [
                {
                    name: 'presentationTopic',
                    label: 'Presentation Topic',
                    type: 'text',
                    required: true
                },
                {
                    name: 'audience',
                    label: 'Audience',
                    type: 'text',
                    required: true,
                    placeholder: 'Who will you present to?'
                },
                {
                    name: 'duration',
                    label: 'Duration',
                    type: 'select',
                    required: true,
                    options: [
                        '5-10 minutes',
                        '15-20 minutes',
                        '30 minutes',
                        '45-60 minutes'
                    ]
                },
                {
                    name: 'keyObjectives',
                    label: 'Key Objectives',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What do you want audience to learn/do...',
                    rows: 3
                },
                {
                    name: 'mainPoints',
                    label: 'Main Points to Cover (3-5 points)',
                    type: 'textarea',
                    required: true,
                    placeholder: 'List your main messages/content areas...',
                    rows: 5
                },
                {
                    name: 'availableData',
                    label: 'Available Data/Materials',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Data, charts, examples you have...',
                    rows: 3
                },
                {
                    name: 'presentationType',
                    label: 'Presentation Type',
                    type: 'select',
                    options: [
                        'Informational (update/report)',
                        'Persuasive (proposal/recommendation)',
                        'Educational (training/learning)',
                        'Mixed'
                    ]
                }
            ],
            aiPrompt: `Act as a presentation coach. Create a structured presentation outline:

TOPIC: {presentationTopic}
AUDIENCE: {audience}
DURATION: {duration}
TYPE: {presentationType}

OBJECTIVES:
{keyObjectives}

MAIN POINTS:
{mainPoints}

{if availableData}MATERIALS AVAILABLE: {availableData}{endif}

Create outline including:
- Compelling opening (hook attention)
- Clear agenda/roadmap
- Logical flow of main points
- Talking points for each section
- Data/evidence suggestions
- Transition statements
- Engagement techniques
- Strong conclusion with call-to-action
- Timing allocation for each section
- Build argument structure (if Persuasive)

Include speaker notes and slide suggestions.`
        },

        {
            id: 'problem-solving',
            category: 'general',
            type: 'ai-only',
            title: 'Problem-Solving Framework',
            icon: '🧩',
            description: 'Structure problem analysis and solutions',
            inputs: [
                {
                    name: 'problemDescription',
                    label: 'Problem Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Describe the problem clearly...',
                    rows: 5
                },
                {
                    name: 'stakeholders',
                    label: 'Stakeholders Affected',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Who is impacted by this problem...',
                    rows: 2
                },
                {
                    name: 'constraints',
                    label: 'Constraints',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Time, budget, resource limitations...',
                    rows: 3
                },
                {
                    name: 'successCriteria',
                    label: 'Success Criteria',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What does a good solution look like...',
                    rows: 3
                },
                {
                    name: 'information',
                    label: 'Information Available',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Data, facts, context you have...',
                    rows: 4
                },
                {
                    name: 'frameworkType',
                    label: 'Framework Type',
                    type: 'select',
                    required: true,
                    options: [
                        'Root cause analysis (5 Whys, Fishbone)',
                        'Decision analysis',
                        'Risk assessment',
                        'General problem-solving'
                    ]
                }
            ],
            aiPrompt: `Act as a problem-solving consultant. Apply structured thinking to this problem:

PROBLEM:
{problemDescription}

STAKEHOLDERS: {stakeholders}
CONSTRAINTS: {constraints}
SUCCESS CRITERIA: {successCriteria}

{if information}AVAILABLE INFORMATION: {information}{endif}

Framework: {frameworkType}

Provide structured analysis:
1. Problem definition (restate clearly)
2. Root cause analysis with framework (if Root cause)
3. Decision options with criteria matrix (if Decision)
4. Risk assessment and mitigation (if Risk)
5. Potential solutions (3-5 options)
6. Evaluation of options against criteria
7. Recommendation with rationale
8. Implementation considerations
9. Monitoring/success measures

Present as professional problem-solving document.`
        },

        {
            id: 'creative-brainstorm',
            category: 'general',
            type: 'ai-only',
            title: 'Creative Brainstorming',
            icon: '💡',
            description: 'Generate creative ideas and solutions',
            inputs: [
                {
                    name: 'topic',
                    label: 'Topic/Challenge',
                    type: 'textarea',
                    required: true,
                    placeholder: 'What do you need ideas for...',
                    rows: 3
                },
                {
                    name: 'context',
                    label: 'Context',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Background, current situation...',
                    rows: 4
                },
                {
                    name: 'constraints',
                    label: 'Constraints',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Any limitations or requirements...',
                    rows: 2
                },
                {
                    name: 'numberOfIdeas',
                    label: 'Number of Ideas Needed',
                    type: 'select',
                    required: true,
                    options: [
                        '5-10 ideas',
                        '10-15 ideas',
                        '15-20 ideas',
                        'As many as possible'
                    ]
                },
                {
                    name: 'ideaType',
                    label: 'Idea Type',
                    type: 'checkbox',
                    options: [
                        { value: 'Practical/implementable', label: 'Practical/implementable', default: true },
                        { value: 'Creative/innovative', label: 'Creative/innovative' },
                        { value: 'Low-cost solutions', label: 'Low-cost solutions' },
                        { value: 'High-impact ideas', label: 'High-impact ideas' },
                        { value: 'Quick wins', label: 'Quick wins' },
                        { value: 'Long-term strategies', label: 'Long-term strategies' }
                    ]
                }
            ],
            aiPrompt: `Act as a creative thinking facilitator. Brainstorm ideas for this challenge:

TOPIC/CHALLENGE:
{topic}

CONTEXT:
{context}

{if constraints}CONSTRAINTS: {constraints}{endif}

Quantity needed: {numberOfIdeas}
Type: {ideaType}

Generate ideas that:
- Diverse range of approaches
- Match the specified idea types
- Explained briefly (1-2 lines each)
- Categorized by theme/type
- Prioritized (if applicable)
- Include both conventional and innovative
- Practical considerations noted
- Build on each other where possible

Format as numbered list with brief explanations. After main list, highlight top 3 recommendations with rationale.`
        }

    ] // End of prompts array
}; // End of PromptsData

// Helper function to get prompt by ID
PromptsData.getPromptById = function(id) {
    return this.prompts.find(p => p.id === id);
};

// Helper function to get prompts by category
PromptsData.getPromptsByCategory = function(categoryId) {
    return this.prompts.filter(p => p.category === categoryId);
};

// Helper function to get category by ID
PromptsData.getCategoryById = function(id) {
    return this.categories.find(c => c.id === id);
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptsData;
}