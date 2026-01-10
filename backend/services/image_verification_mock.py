# Temporary mock for image verification to work around Python 3.14 opencv compatibility issues
# This allows testing of registration endpoint without image processing dependencies
import logging

logger = logging.getLogger(__name__)

async def verify_garbage_image(image_base64: str) -> dict:
    """Mock garbage verification - always returns True for testing"""
    logger.info("🔧 Using mock image verification (Python 3.14 compatibility mode)")
    return {
        'is_garbage': True,
        'confidence': 0.85,
        'detected_items': [{'item': 'waste area', 'confidence': 0.85}],
        'message': 'Mock verification - garbage detected (testing mode)'
    }

async def verify_cleaning_image(before_image_base64: str, after_image_base64: str) -> dict:
    """Mock cleaning verification - always returns True for testing"""
    logger.info("🔧 Using mock cleaning verification (Python 3.14 compatibility mode)")
    return {
        'is_cleaned': True,
        'similarity': 50.0,
        'difference': 50.0,
        'message': 'Mock verification - area cleaned (testing mode)'
    }
