import re

with open('assets/script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Activity Log and Feature Analysis Helpers
helpers = """
    // --- Activity Log & Feature Analysis ---
    let activityLog = [];
    let animationsEnabled = true;
    let trainingSessionsCount = 0;
    let bestAccuracy = 0;

    function logActivity(message) {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        activityLog.unshift(`[${time}] ${message}`);
        if(activityLog.length > 50) activityLog.pop();
        
        const list = document.getElementById('activity-log-list');
        if(list) {
            list.innerHTML = activityLog.map(msg => `<li style="padding: 10px; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; color: var(--text-muted);"><i class="fas fa-angle-right" style="color: var(--accent); margin-right: 8px;"></i> ${msg}</li>`).join('');
        }
    }

    function updateFeatureAnalysis(data) {
        if(!data) return;
        const panel = document.getElementById('feature-analysis-panel');
        if(panel) {
            panel.classList.remove('hidden');
            document.getElementById('feat-most-name').textContent = data.most_important.name;
            document.getElementById('feat-most-val').textContent = (data.most_important.importance * 100).toFixed(1) + '%';
            document.getElementById('feat-least-name').textContent = data.least_important.name;
            document.getElementById('feat-least-val').textContent = (data.least_important.importance * 100).toFixed(1) + '%';
        }
    }

    // --- Settings Modal & Theme Logic ---
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-modal');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.remove('hidden');
            settingsModal.style.display = 'flex';
        });
    }
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
            setTimeout(() => settingsModal.style.display = 'none', 300);
        });
    }
    
    const themeRadios = document.getElementsByName('theme');
    themeRadios.forEach(r => r.addEventListener('change', (e) => {
        if(e.target.value === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }));

    const animRadios = document.getElementsByName('animations');
    animRadios.forEach(r => r.addEventListener('change', (e) => {
        animationsEnabled = (e.target.value === 'enable');
    }));

    const logRadios = document.getElementsByName('activitylog');
    const activityLogSection = document.getElementById('activity-log-section');
    logRadios.forEach(r => r.addEventListener('change', (e) => {
        if(e.target.value === 'show') {
            activityLogSection.classList.remove('hidden');
        } else {
            activityLogSection.classList.add('hidden');
        }
    }));

    if(document.getElementById('log-show') && document.getElementById('log-show').checked && activityLogSection) {
        activityLogSection.classList.remove('hidden');
    }

"""
content = content.replace("// --- DOM Elements ---", helpers + "\n    // --- DOM Elements ---")

# 2. Inject logActivity into fetchDatasetInfo
content = content.replace("document.getElementById('stat-features').textContent = data.features;", 
                          "document.getElementById('stat-features').textContent = data.features;\n            logActivity('Dataset Loaded');\n            if(data.feature_importance_data) updateFeatureAnalysis(data.feature_importance_data);")

# 3. Inject Animation Sequence in Train Logic
train_anim = """
        if (animationsEnabled) {
            statusDiv.textContent = 'Loading Dataset...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Preprocessing Data...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Training Model...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Calculating Metrics...';
            await new Promise(r => setTimeout(r, 400));
            statusDiv.textContent = 'Generating Visualizations...';
            await new Promise(r => setTimeout(r, 400));
        } else {
            statusDiv.textContent = 'Initializing training sequence...';
        }
"""
content = content.replace("statusDiv.textContent = 'Initializing training sequence...';", train_anim)

# 4. Inject logActivity and feature analysis into train success
train_success = """
                logActivity('Model Trained');
                document.getElementById('stat-k-value').textContent = kNeighbors;
                if(data.feature_importance_data) updateFeatureAnalysis(data.feature_importance_data);
                statusDiv.textContent = 'Training Completed';
                setTimeout(() => { if(statusDiv.textContent === 'Training Completed') statusDiv.textContent = ''; }, 3000);
"""
content = content.replace("statusDiv.textContent = 'Model trained and saved successfully.';", "statusDiv.textContent = 'Model trained and saved successfully.';\n" + train_success)

# 5. Inject logActivity and UI update into Predict success
ai_explanation = """
                logActivity('Prediction Generated');
                document.getElementById('stat-predictions').textContent = predictionSessionHistory.length;
                
                const aiPanel = document.getElementById('ai-explanation-box');
                const aiList = document.getElementById('pred-ai-explanation');
                if(aiPanel && aiList) {
                    aiPanel.classList.remove('hidden');
                    let aiPoints = '';
                    if(result.prediction === 'Setosa') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Setosa patterns.</li>`;
                        if(pw < 0.6) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    } else if (result.prediction === 'Versicolor') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Versicolor patterns.</li>`;
                        if(pw >= 1.0 && pw <= 1.8) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    } else if (result.prediction === 'Virginica') {
                        aiPoints += `<li>Petal Length (${pl}) strongly matches Virginica patterns.</li>`;
                        if(pw > 1.8) aiPoints += `<li>Petal Width (${pw}) contributes significantly.</li>`;
                    }
                    aiPoints += `<li>Measurements closely align with learned dataset patterns.</li>`;
                    aiPoints += `<li>Prediction Confidence: ${(result.confidence * 100).toFixed(1)}%</li>`;
                    aiList.innerHTML = aiPoints;
                }
"""
content = content.replace("document.getElementById('session-count').textContent = predictionSessionHistory.length;", "document.getElementById('session-count').textContent = predictionSessionHistory.length;\n" + ai_explanation)

# 6. Inject logActivity into export history and view dataset
content = content.replace("showToast(\"Prediction history exported.\", \"success\");", "showToast(\"Prediction history exported.\", \"success\");\n        logActivity('History Exported');")
content = content.replace("fetchDatasetExplorerData();", "fetchDatasetExplorerData();\n        logActivity('Dataset Viewed');")

# 7. Add Settings modal window click listener to existing window listener
content = content.replace("if(e.target === sessionModal) {", "if(e.target === settingsModal) { settingsModal.classList.add('hidden'); setTimeout(() => settingsModal.style.display = 'none', 300); }\n        if(e.target === sessionModal) {")

# 8. Update history parsing for Best Accuracy and Training Sessions
history_parsing = """
                trainingSessionsCount = data.length;
                document.getElementById('stat-sessions').textContent = trainingSessionsCount;
                data.forEach(d => {
                   const acc = d.metrics ? d.metrics.accuracy : (d.accuracy || 0);
                   if(acc > bestAccuracy) bestAccuracy = acc;
                });
                document.getElementById('stat-best-acc').textContent = (bestAccuracy * 100).toFixed(2) + '%';
"""
content = content.replace("const tbody = document.getElementById('history-tbody');", history_parsing + "\n                const tbody = document.getElementById('history-tbody');")

with open('assets/script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated script.js successfully")
